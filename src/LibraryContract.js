import {ethers, parseUnits} from 'ethers';
import LibraryContractABI from './LibraryContractABI.json';
import tokenABI from './TokenContractABI.json';

// const provider2 = new ethers.providers.JsonRpcProvider(); // Connect to Ethereum node
const provider = new ethers.BrowserProvider(window.ethereum); // Connect to Ethereum node
const signer = await provider.getSigner();
console.log("signer :", await provider.getSigner());

const libAddress = "0xB7e2038753547602893c9a4c7C9D5CCE358b93b3";//test hardhat
const libToken = new ethers.Contract(libAddress, tokenABI, signer);

// const contractAddress = '0x612721395Dcf3A14B5535C3617f89929864E76aB'; // Replace with actual contract address
const contractAddress = "0x6d92Cf4bD6205cFd7C1309D6EBA65A11D8c49ce7"; //test hardhat
const contractInstance = new ethers.Contract(contractAddress, LibraryContractABI, signer);
// await contractInstance.wait();

console.log("contract instance : ", contractInstance.target);

export const getBookInfo = async (bookId) => {
  return await contractInstance.getBookInfo(bookId);
};

export const addBook = async (title, bookPrice) => {
  console.log("method addbook called ", title);
  console.log("Book price inside : ", bookPrice);
  return await contractInstance.addBook(title, parseInt(Number(bookPrice * 10 ** 18)));
  // console.log("test : ", await contractInstance.interface);
  // await transaction.wait(); // Wait for transaction to be mined
};

export const checkOut = async (bookId) => {
  console.log("test : ", bookId);
  const transaction = await contractInstance.BookIssue(bookId);
  // await transaction.wait(); // Wait for transaction to be mined
};

export const addUser = async (name, userId, initialSupply) => {
  console.log("ini sup : ", name);
  console.log("user id : ", userId);
  console.log("contract addr : ", initialSupply);
  const maxBal = await libToken.balanceOf(signer.address);
  console.log("max bal : ", maxBal);
  await libToken.approve(contractInstance.target, parseInt(Number(maxBal)));
  const transaction = await contractInstance.addUser(name, userId, parseInt(Number(initialSupply)));
  // await transaction.wait(); // Wait for transaction to be mined
};

export const returnBook = async (bookId) => {
  const transaction = await contractInstance.returnBook(bookId);
  await transaction.wait(); // Wait for transaction to be mined
};

export const getUserBorrowedBooks = async (userId) => {
  // console.log("borrow book user id : ", userId);
  console.log("return books : ", await contractInstance.getUserBorrowedBooks(userId));
  return await contractInstance.getUserBorrowedBooks(userId);
};

export const getBalance = async (userId) => {
  console.log("decimals : ", await libToken.decimals());
  console.log("get balance called : ", userId);
  console.log("lib token : ", libToken.target);
  return await libToken.balanceOf(userId);
}

export const transferToken = async (userAddress, transferToAddress, transferAmount) => {
  console.log("transfe amount : ", transferToAddress);
  const appr = await libToken.approve(transferToAddress, libToken.totalSupply());
  console.log("allowance : ", await libToken.allowance(userAddress, "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"));
  // await libToken.transferFrom(userAddress, transferToAddress, Number(transferAmount));
  // const value = (transferAmount * 10 ** 18);
  // let amt = transferAmount * 10 ** 18;
  await libToken.transfer(transferToAddress, Number(transferAmount));
  return true;
}
