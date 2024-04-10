import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { addBook, getBookInfo, checkOut, addUser, returnBook, getUserBorrowedBooks } from './LibraryContract';

function App() {
  const [bookId, setBookId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookInfo, setBookInfo] = useState({});
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [userAddr, setUserAddr] = useState("");

  useEffect(() => {
    console.log("use effect ");
  });

  const connectWallet = async () => {
    try {
      if(window.ethereum){
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setUserAddress(accounts);
      console.log("connected to account :", accounts);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.BrowserProvider(window.ethereum);

      setProvider(provider);
      setWalletConnected(true);
      }else{
        alert("Please download metamask");
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleAddBook = async () => {
    await addBook(bookTitle);
  };

  const handleGetBookInfo = async () => {
    const info = await getBookInfo(bookId);
    setBookInfo(info);
  };

  const handleCheckOut = async () => {
    try
    {
      const checkout = await checkOut(bookId);
      alert("Successfully checked out!...");
    }catch(error){
      console.log("error checkout :", error);
      alert("Error in checkout, try again...");
    }

    // setBookInfo(checkOut);
  }

  const handleAddUser = async () => {
    try{
      await addUser(userName);
      setUserName(userName);
      alert("Successfully added the user : ");
    }catch(error){
      alert("Error in adding user, try again...");
    }
  }

  const handleReturnBook = async () => {
    try{
      await returnBook(bookId);
      alert("Successfully returned book");
    }catch(error){
      alert("Error in returning book...");
    }
  }

  const handleGetUserBorrowedBooks = async () => {
    try{
      const books = await getUserBorrowedBooks(userAddr);
      console.log("books : ", books);
      setBorrowedBooks(books);
      console.log("books counts : ", userAddr);
      borrowedBooks.map(m => {
        console.log("book : ", m)
      });
      console.log("books : ", borrowedBooks);
    }catch(error){
      alert("Error in fetching the data...");
    }
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Library Management DApp </h1>
        {!walletConnected ? (
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          // <p>Wallet Connected</p>
          <b>{userAddress}</b>
        )}
      </header>
      <div>
        <input type="text" placeholder="Book Title" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
      <div>
        <input type="text" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <button onClick={handleAddUser}>Add User</button> {/* New button for adding user */}
      </div>
      <div>
        <input type="text" placeholder="Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} />
        <button onClick={handleGetBookInfo}>Get Book Info</button>
        <button onClick={handleCheckOut}>Check Out</button> {/* New button for checkout */}
        <button onClick={handleReturnBook}>Return Book</button> {/* New button for returning book */}
      </div>
      <div>
        {/* <pre>{JSON.stringify(bookInfo, null, 2)}</pre> */}
        <pre>{bookInfo[1]} - {bookInfo[2]}</pre>
      </div>
      <div>
        <input type="text" placeholder="User Address" value={userAddr} onChange={(e) => setUserAddr(e.target.value)} />
        <button onClick={handleGetUserBorrowedBooks}>Get User Borrowed Books</button>
      </div>
      <div>
        <h2>Borrowed Books:</h2>
        <ul>
          {borrowedBooks.map((bookId, index) => (
            <li key={index}>{Number(bookId)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
