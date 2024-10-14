'use strict';

const {
    utils: { deployContract },
} = require('@axelar-network/axelar-local-dev');

const JacketNMT = rootRequire('./artifacts/examples/evm/cross-chain-NMT/JacketNMT.sol/JacketNMT.json');
const TestSmartPolicy = rootRequire('./artifacts/examples/evm/cross-chain-NMT/TestSmartPolicy.sol/TestSmartPolicy.json');
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

async function deploy(chain, wallet) {
    console.log(`Deploying Smart contracts for ${chain.name}.`);
    chain.testSmartPolicy = await deployContract(wallet, TestSmartPolicy);
    console.log("creator:", chain.constAddressDeployer)
    console.log("SP address:", chain.testSmartPolicy.address)
    chain.jacketNmt = await deployContract(wallet, JacketNMT, [chain.constAddressDeployer, chain.testSmartPolicy.address]);
    chain.wallet = wallet;
    console.log(`Deployed TestSmartPolicy for ${chain.name} at ${chain.testSmartPolicy.address}.`);
    console.log(`Deployed JacketNMT for ${chain.name} at ${chain.jacketNmt.address}.`);
}

async function execute(chains, wallet, options) {
    const args = options.args || [];
    const { source, destination, calculateBridgeFee,constAddressDeployer } = options;
    const message = args[2] || `Hello ${destination.name} from ${source.name}, it is ${new Date().toLocaleTimeString()}.`;
    console.log(destination.constAddressDeployer)
    const minted = await destination.jacketNmt.mint(destination.constAddressDeployer, destination.testSmartPolicy.address, destination.testSmartPolicy.address)
    async function logValue() {
        console.log(`*** value at ${destination.name} is` );//"${minted}"`);
    }

    console.log('--- Initially ---');
    await logValue();

    const fee = await calculateBridgeFee(source, destination);



    // const tx = await source.jacketNmt.setRemoteValue(destination.name, destination.jacketNmt.address, message, {
    //     value: fee,
    // });
    // await tx.wait();

    // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // while ((await destination.jacketNmt.message()) !== message) {
    //     await sleep(1000);
    // }

    console.log('--- After ---');
    await logValue();
}

module.exports = {
    deploy,
    execute,
};
