import {ethers} from 'ethers';
import LibraryContractABI from './LibraryContractABI.json';

// const provider2 = new ethers.providers.JsonRpcProvider(); // Connect to Ethereum node
const provider = new ethers.BrowserProvider(window.ethereum); // Connect to Ethereum node
const signer = await provider.getSigner();
console.log("provider :", await provider.getSigner());

const contractAddress = '0x612721395Dcf3A14B5535C3617f89929864E76aB'; // Replace with actual contract address
const contractInstance = new ethers.Contract(contractAddress, LibraryContractABI, signer);
// await contractInstance.wait();

console.log("contract instance :", contractInstance.target);

export const getBookInfo = async (bookId) => {
  return await contractInstance.getBookInfo(bookId);
};

export const addBook = async (title) => {
  console.log("method addbook called ", title);
  const transaction = await contractInstance.addBook(title);
  // await transaction.wait(); // Wait for transaction to be mined
};

export const checkOut = async (bookId) => {
  const transaction = await contractInstance.checkOut(bookId);
  await transaction.wait(); // Wait for transaction to be mined
};

export const addUser = async (name) => {
  const transaction = await contractInstance.addUser(name);
  await transaction.wait(); // Wait for transaction to be mined
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
