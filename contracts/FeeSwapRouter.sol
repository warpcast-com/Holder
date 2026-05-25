// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract FeeSwapRouter {
    address public immutable feeRecipient;
    address public owner;

    event TradeExecuted(
        address indexed trader,
        address indexed sellToken,
        address indexed buyToken,
        uint256 sellAmount,
        uint256 buyAmount,
        uint256 feeAmount,
        uint256 timestamp,
        bytes32 indexed tradeId
    );

    constructor(address _feeRecipient) {
        feeRecipient = _feeRecipient;
        owner = msg.sender;
    }

    receive() external payable {}

    function swapWithFeeETH(
        address zeroXTarget,
        bytes calldata zeroXData,
        uint256 feeAmount,
        uint256 swapValue,
        address sellToken,
        address buyToken,
        uint256 minBuyAmount,
        bytes32 tradeId
    ) external payable {
        require(msg.value == feeAmount + swapValue, "invalid msg.value");
        (bool okFee, ) = feeRecipient.call{value: feeAmount}("");
        require(okFee, "fee transfer failed");
        (bool okSwap, ) = zeroXTarget.call{value: swapValue}(zeroXData);
        require(okSwap, "swap failed");
        emit TradeExecuted(msg.sender, sellToken, buyToken, swapValue, minBuyAmount, feeAmount, block.timestamp, tradeId);
    }

    function swapWithFeeERC20(
        address sellToken,
        address buyToken,
        address zeroXTarget,
        bytes calldata zeroXData,
        uint256 feeAmount,
        uint256 swapAmount,
        uint256 minBuyAmount,
        bytes32 tradeId
    ) external {
        require(IERC20(sellToken).transferFrom(msg.sender, feeRecipient, feeAmount), "fee transfer failed");
        require(IERC20(sellToken).transferFrom(msg.sender, address(this), swapAmount), "swap transfer failed");
        require(IERC20(sellToken).approve(zeroXTarget, swapAmount), "approve failed");
        (bool okSwap, ) = zeroXTarget.call(zeroXData);
        require(okSwap, "swap failed");
        emit TradeExecuted(msg.sender, sellToken, buyToken, swapAmount, minBuyAmount, feeAmount, block.timestamp, tradeId);
    }
}