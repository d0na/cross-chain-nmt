// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./SmartPolicy.sol";

contract TestSmartPolicy is SmartPolicy {
    constructor() {}

    function evaluate(
        address _subject,
        bytes memory _action,
        address _resource
    ) public view virtual override returns (bool) {
        // console.log("Passed action [DENY_ALL SP]:");
        // console.logBytes(_action);
        if (_subject == _subject && _resource == _resource) {
            return true;
        }
        return true;
    }

    fallback() external {
        //console.log("Fallback OwnerSmartPolicy");
    }
}
