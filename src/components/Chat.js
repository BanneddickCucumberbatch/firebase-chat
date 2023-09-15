import React, { useEffect, useRef } from "react";
import { useContext, useState } from "react";
import { Context } from "..";
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";


const Chat = () => {

    const {auth, database} = useContext(Context);
    const [user, setUser] = useState(null);
    const timeStamp = new serverTimestamp();
    const [messages, setMessages] = useState(null);
    const textRef = useRef(null)

    useEffect(() => {
        setUser(auth.currentUser)
    }, [auth]);

    useEffect(() => {
        const q = query(collection(database, 'messages'),orderBy('createdAt'))
            const unsubscribe = onSnapshot(q, (querySnaphot) => {
                const messagesList = []
                querySnaphot.forEach((doc) => {
                    messagesList.push(doc.data())
                })
                setMessages(messagesList)
            })
        return () => {
            unsubscribe()
        }
    }, [database])

    const sendMessage = async () => {
        try {
            const docRef = await addDoc(collection(database, "messages"), {
                uid: user.uid,
                displayName: user.displayName,
                createdAt: timeStamp,
                photoURL: user.photoURL,
                text: textRef.current.value, 
            });
            console.log("Document written with ID:", docRef.id)
            textRef.current.value = ''
            
            
        } catch (err) {
            console.error("ОШИБКА БЛЯТЬ ВОТ В ЧЕМ КОРОЧЕ", err)
        }
    }
    
    return ( 
        <Container>
            <Grid container
                  justifyContent={"center"}
                  style={{height: window.innerHeight - 70, marginTop: 10}}>
                <div style={{width: '80%', height: '70vh', border: '1px solid gray', overflowY: 'auto'}} className="chatWindow">
                    {messages && messages.map((message) => 
                    <div key={message.createdAt} style={{margin: 10, 
                                 marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                 color: "#ffffff",
                                 width: 'fit-content',
                                 minWidth: 200,
                                 maxWidth: 300,
                                 padding: 10,
                                 borderRadius: 10,
                                 backgroundImage: user.uid === message.uid 
                                 ? "linear-gradient(to left bottom, #051937, #004672, #007895, #00ab93, #22da6d)"
                                 : "linear-gradient(to left bottom, #2672e5, #6269ea, #8f5ce8, #b648e0, #da22d1)"}}>
                        <Grid container justifyContent={'flex-start'} direction={'column'}>
                            <div className="userInfo">
                                <Avatar className="avatar" src={message.photoURL} variant="rounded" sx={{width: 25, height: 25}} />
                                <div className="displayName">{message.displayName}</div>
                            </div>
                            <div className="messageBody">{message.text}</div>
                        </Grid>
                    </div>
                    )}
                </div>
                <Grid container direction={"column"} alignItems={"flex-end"} style={{width: '80%'}}>
                        <TextField variant="outlined" 
                                   fullWidth 
                                   maxRows={2}
                                   inputRef={textRef}
                                   />
                        <Button variant="outlined" style={{marginTop: 10}} onClick={sendMessage} >Send</Button>
                </Grid>
            </Grid>
        </Container>
     );
}
 
export default Chat;