import { useEffect, useState } from 'react';
import '../styles/newfriends.css'
import { FaSearch } from 'react-icons/fa';

export default function NewFriends() {

    console.log('new')

    const changeColor = (id) => {

        if (id == 'one') {
            document.getElementById('one').style.background = 'black'
            document.getElementById('two').style.background = 'rgb(62, 146, 185)'
            document.getElementById('three').style.background = 'rgb(62, 146, 185)'


        }
        else if (id == 'two') {
            document.getElementById('two').style.background = 'black'
            document.getElementById('one').style.background = 'rgb(62, 146, 185)'
            document.getElementById('three').style.background = 'rgb(62, 146, 185)'


        }
        else if (id == 'three') {
            document.getElementById('three').style.background = 'black'
            document.getElementById('two').style.background = 'rgb(62, 146, 185)'
            document.getElementById('one').style.background = 'rgb(62, 146, 185)'


        }


    }

    const [allfriends, setAllFriendsData] = useState([]);
    const [friendRequestsData, setFriendRequestsData] = useState([])
    const [friendSentData, setFriendSentData] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [arr, setArr] = useState([]);

    const [input, setInput] = useState('');

    useEffect(() => {

        if (input === '')
            setArr([])
        else {
            const arr = allUsers.filter((elem) => {

                let query = input.toLowerCase();

                let username = elem.username.toLowerCase()

                if (username.includes(query))
                    return elem

            })

            setArr(arr)
        }

    }, [input])

    const handleSendRequest = (conversationId) => {
        fetch('http://localhost:9000/friends/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: localStorage.getItem('token'), to: conversationId })

        })
    };

    function handleRejectFriend(id) {
        fetch('http://localhost:9000/friends/reject', {

            headers: {
                token: localStorage.getItem('token'),
                id: id,
                friend: true
            }

        }).then(res => res.json())

        let arr = allfriends.filter(elem=>elem._id!=id)


        setAllFriendsData(arr);



    }

    function handleRejectSent(id) {
        fetch('http://localhost:9000/friends/reject', {

            headers: {
                token: localStorage.getItem('token'),
                id: id
            }

        }).then(res => res.json())



    }

    useEffect(() => {

        fetch('http://localhost:9000/friends/getfriends', {
            headers: {
                token: localStorage.getItem('token'),
            }
        }).then((res) => res.json()).then(res => setAllFriendsData(res.users))

        fetch('http://localhost:9000/friends/getrequest', {
            headers: {
                token: localStorage.getItem('token'),
            }
        }).then((res) => res.json()).then(res => { console.log(res); setFriendRequestsData(res.users) })

        fetch('http://localhost:9000/friends/sentrequest', {
            headers: {
                token: localStorage.getItem('token'),
            }
        }).then((res) => res.json()).then(res => { console.log(res); setFriendSentData(res.users) })

        fetch('http://localhost:9000/allusers/allusers', {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then(res => res.json()).then((res) => {
            console.log(res)
            setAllUsers(res.allusers);
        })

    }, [])


    return (
        <div id='container_newFriends'>
            <div style={{ width: '50%', padding: '0', margin: '0', position: 'relative' }}>
                <div id='search-container' >
                    <div style={{ marginTop: "0.15rem", color: 'white', fontSize: '1rem' }}>
                        <FaSearch />
                    </div>
                    <input id='input' onChange={() => { setInput(document.getElementById('input').value) }}
                        onFocus={
                            () => document.getElementById('input').placeholder = ""
                        }
                        onMouseLeave={() => {
                            document.getElementById('input').placeholder = "Search People...."
                        }}
                        onMouseEnter={() => {
                            document.getElementById('input').placeholder = ""
                        }}
                        onBlur={() => {
                            document.getElementById('input').placeholder = "Search People...."
                        }} type="text" placeholder='Search People....' />
                </div>
                {arr.length > 0 &&

                    <div id='searchResults'>
                        {arr.map((elem) => {
                            return (<div>

                                <div id='allFriendsElem' ><div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                        {elem.username}
                                        <div>{
                                            elem.email
                                        }</div>
                                    </div>
                                </div>
                                    <div >
                                        <div onClick={() => handleSendRequest(elem._id)} className='send'>Send
                                        </div>
                                    </div></div>

                            </div>)
                        })}
                    </div>
                }

            </div>




            <div id="btns">
                <li id='one' style={{ borderRight: 'solid 1px wheat' }} onClick={() => {
                    changeColor('one');
                    document.getElementById('first').style.display = 'block';
                    document.getElementById('second').style.display = 'none';
                    document.getElementById('third').style.display = 'none';

                }}>ALL FRIENDS</li>
                <li id='two' style={{ borderRight: 'solid 1px wheat' }} onClick={() => {
                    changeColor('two')
                    document.getElementById('second').style.display = 'block';
                    document.getElementById('first').style.display = 'none';
                    document.getElementById('third').style.display = 'none';
                }}>REQUESTS</li>
                <li id='three' onClick={() => {
                    changeColor('three')
                    document.getElementById('second').style.display = 'none';
                    document.getElementById('first').style.display = 'none';
                    document.getElementById('third').style.display = 'block';
                }}>SENT REQUESTS</li>
            </div>

            <div style={{ display: 'none' }} id='first' className='newFriendsTable'>
                {allfriends.map((elem) => {
                    return (<div id='listitem' style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '75%', alignItems:'center'}}>
                            <div>{elem.username}</div>
                            <div className='send' onClick={() => {
                                handleRejectFriend(elem._id)

                            }}> remove </div>
                        </div>

                    </div>)
                })}
            </div>
            <div id='second' className='newRequestTable' style={{ display: 'none' }} >
                {friendRequestsData.length > 0 ? friendRequestsData.map((elem) => {
                    return (<div id='listitem' style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <img src="https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg" alt="" />
                        </div>
                        <div>{elem.username}</div>
                    </div>)
                }) : 'No Requests'}
            </div>
            <div id='third' style={{ display: 'none' }} className='newSentTable'>
                {friendSentData.length > 0 ? friendSentData.map((elem) => {
                    return (<div id='listitem' style={{ display: 'flex', alignItems: 'center' }}>
                        <div>
                            <img src="https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-boy-images-4.jpg" alt="" />
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between', width:'75%', alignItems:'center'}}>
                        <div>{elem.username}</div>
                        <div className='send' onClick={() => {
                            handleRejectSent(elem._id)

                        }}> remove </div>
                        </div>
                        
                    </div>)
                }) : 'No Requests'}
            </div>
        </div>

    )
}