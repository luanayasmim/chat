import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker.js'

const SUPABASE_URL = 'https://pvgvynuxgmwbcijfvgbe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0Mzc1MDQ1MCwiZXhwIjoxOTU5MzI2NDUwfQ.TMhj2cOcxvxa2flAfK_zL9aWq6F8KETyfbYw1AAadsY';
const supabase_client= createClient(SUPABASE_URL ,SUPABASE_ANON_KEY);

//Função para atualizar chat em tempo real
function updateChat(addMessage){
    return supabase_client
        .from('messages')
        .on('INSERT', (data)=>{
            addMessage(data.new);
            console.log("New message!", data);
            // sendSlackAlert(data);
        })
        .subscribe()
}

export default function ChatPage() {
    const router=useRouter();
    const login=router.query.username;
    const [message, setMessage] = React.useState('');
    const [messageList, setMessageList] = React.useState([]);

    React.useEffect(()=>{
        const supabase_data=supabase_client
            .from('messages')
            .select('*')
            .order('id', {ascending:false})
            .then(({data})=>{
                setMessageList(data);
        });
        updateChat((newMessage)=>{
            console.log('New message: ', newMessage)
            //handleNewMessage(newMessage);
            //Valor atual da lista
            setMessageList((messageListUpdating)=>{
                return [
                        newMessage,
                        ...messageListUpdating,
                ];
            });
        });
    }, []);

    function handleNewMessage(newMessage) {
        const message = {
            //id: messageList.length + 1,
            from: login,
            text: newMessage,
        };

        supabase_client
            .from('messages')
            .insert([message])
            .then(({data})=>{
                console.log('new message...', data);
            });

        setMessage('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    //backgroundColor: appConfig.theme.colors.neutrals[700],
                    backgroundColor: "rgba(33, 41, 49, 0.5)",
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    
                    
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        //backgroundColor: appConfig.theme.colors.neutrals[600],
                        backgroundColor: "rgba(33, 41, 49, 0.5)",
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList messages={messageList} />
                    
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {/* Callback */}
                        <ButtonSendSticker
                            onStickerClick={(sticker)=>{
                                // console.log('Salvando');
                                handleNewMessage(`:sticker: ${sticker}`);
                            }}
                        />
                        <TextField
                            value={message}
                            onChange={(event) => {
                                const value = event.target.value;
                                setMessage(value);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNewMessage(message);
                                }
                            }}
                            placeholder="Write your message here..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <Button
                            type='button'
                            label='Send'
                            onClick={(event) => {
                                const value = event.target.value;
                                setMessage(value);
                                handleNewMessage(message);
                            }}
                            buttonColors={{
                              contrastColor: appConfig.theme.colors.neutrals["000"],
                              mainColor: appConfig.theme.colors.primary[400],
                              mainColorLight: appConfig.theme.colors.primary[300],
                              mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((message) => {
                return (
                    <Text
                        key={message.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${message.from}.png`}
                            />
                            <Text tag="strong">
                                {message.from}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* {message.text.startsWith(':sticker:').toString()} */}
                        {message.text.startsWith(':sticker:') 
                            //condicional ternária - if / else
                            ? (
                                <Image src={message.text.replace(':sticker:', '')}/>
                            )
                            :(
                                message.text
                            )
                        }
                    </Text>
                );
            })}
        </Box>
    )
}