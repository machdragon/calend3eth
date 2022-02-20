const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Calend3eth", function () {
  it("Should set the minutely rate", async function () {
    const Contract = await ethers.getContractFactory("Calend3eth");
    const contract = await Contract.deploy();
    await contract.deployed();

    const tx = await contract.setRate(1000);

    // wait until the transaction is mined
    await tx.wait();

    // verify rate is set correctly
    expect(await contract.getRate()).to.equal(1000);

    // get addresses
    const [owner, addr1, addr2] = await ethers.getSigners();

    // console.log(owner.address)
    // console.log(addr1.address)

    // call setRate using a different account address
    // this should fail since this address is not the owner
    await expect(
      contract.connect(addr1).setRate(500)
    ).to.be.revertedWith('Only the owner can set the rate')
  });
});
