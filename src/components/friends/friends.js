import React, { useState, useEffect } from 'react';
import SearchBar from '../search-sort-bar/searchbar';
import Pagination from '../pagination/pagination';
import Modal from '../modal/modal';
import './friends.css';

const Friends = () => {
  let [friendsList, setFriendsList] = useState([]);
  let [newName, setNewName] = useState('');
  let [friendId, setFriendId] = useState(1);
  let [searchedText, setSearchedText] = useState('');
  let [searchedFriends, setSearchedFriends] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [modalCallback, setModalCallback] = useState();
  const friendsPerPage = 4;

  /**
   * @description - set searchedFriendsList based on search bar text
   */
  useEffect(() => {
    const results = friendsList.filter((friend) =>
      friend.name.toLowerCase().includes(searchedText.toLowerCase())
    );
    setSearchedFriends(results);
  }, [searchedText, friendsList]);

  /**
   *
   * @param {*} e - event from input element
   * @description - update value of input
   */
  const handleInputValue = (e) => {
    setNewName(e.target.value);
  };

  /**
   *
   * @param {Event} e - event from input element
   * @description - add name to the friends list on enter and make input value empty
   */
  const addName = (e) => {
    if (e.key === 'Enter' && newName !== '') {
      setFriendsList((preList) => {
        return [
          ...preList,
          { id: friendId, name: newName, isFavourite: false },
        ];
      });
      setFriendId((prevId) => {
        return prevId + 1;
      });
      // make input value empty
      setNewName('');
    }
  };

  /**
   * @param friend - friend name object which need to be deleted
   * @description - remove friend object which is passed as argument
   */
  const handleDelete = (friend) => {
    const newList = friendsList.filter((item) => {
      return item.id !== friend.id;
    });
    setFriendsList(newList);
    setCurrentPage(1);
  };

  /**
   * @param friend - friend name object which need to be deleted
   * @description - mark isFavourite true of friend object passed as argument
   */
  const handleFavClick = (friend) => {
    const newList = friendsList.map((item) => {
      if (item.id === friend.id) {
        item.isFavourite = true;
      }
      return item;
    });
    setFriendsList(newList);
  };

  /**
   * @description - sort friends list favourite on top and move to page one
   */
  const sortFav = () => {
    const newList = [...searchedFriends];
    if (newList.length) {
      newList.sort((item) => {
        return item.isFavourite ? -1 : 1;
      });
      setSearchedFriends(newList);
      setCurrentPage(1);
    }
  };

  // Get current list of friends
  const indexOfLastFriend = currentPage * friendsPerPage;
  const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
  const currentPageFriends = searchedFriends.slice(
    indexOfFirstFriend,
    indexOfLastFriend
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container">
        <h3>Friends List</h3>
        <input
          className="form-control"
          placeholder="Enter your friend's name"
          onChange={handleInputValue}
          onKeyDown={addName}
          value={newName}
        ></input>
        <SearchBar
          searchedText={searchedText}
          setSearchedText={setSearchedText}
          sortFav={sortFav}
        />
        {!currentPageFriends.length && (
          <div className="list-group-item">No friends added!</div>
        )}

        {currentPageFriends.length > 0 && (
          <>
            <ul className="list-group">
              {currentPageFriends.map((friend) => {
                return (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={friend.id}
                  >
                    {friend.name}
                    <span>
                      <span
                        className="margin-right action-icons"
                        onClick={() => {
                          handleFavClick(friend);
                        }}
                      >
                        {friend.isFavourite && <i className="fas fa-star"></i>}
                        {!friend.isFavourite && <i className="far fa-star"></i>}
                      </span>
                      <span
                        className="action-icons"
                        onClick={() => {
                          setModalCallback(() => () => {
                            handleDelete(friend);
                          });
                          setOpenPopup(true);
                        }}
                      >
                        <i className="far fa-trash-alt"></i>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
            {searchedFriends.length > friendsPerPage && (
              <Pagination
                friendsPerPage={friendsPerPage}
                totalFriends={friendsList.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </>
        )}
        <Modal
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          onAfterConfirm={modalCallback}
        />
      </div>
    </>
  );
};

export default Friends;
