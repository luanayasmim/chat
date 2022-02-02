//24-01-2022 - Criando a primeira página com React.js

import {Box, Button,Text, TextField, Image} from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';


function Title(props){
	const Tag=props.tag;
	return(
		<>
			<Tag>{props.children}</Tag>
		
			<style jsx>{`
				${Tag}{
					color: ${appConfig.theme.colors.neutrals['400']};
					font-size:24px;
					font_weight:600;
				}
			`}</style>
		</>
	);
}

export default function HomePage() {
  //const username = 'luanayasmim';
  const [username, setUsername]=React.useState('luanayasmim');
  //Buscando informações do usuário a partir da API do Github
  const userData = fetch(`https://api.github.com/users/${username}`).then(function(userData){return userData.json()}).then(function(data){return(data.name)});
  const router=useRouter(); // Roteando a troca de páginas com o next

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            //backgroundColor: appConfig.theme.colors.neutrals[700],
            backgroundColor: "rgba(33, 41, 49, 0.5)"
          }}
        >
          {/* Formulário */}
          <Box
            as="form" // estilo do box para formulário
            //Previnindo o recarregamento total da página 
            onSubmit={function (event){
              event.preventDefault();
              //window.location.href='/chat'; //troca de página
              //troca de página com next - Hook - a partir da variável declarada no estopo da função
              router.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Welcome!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name+" "+userData}
              {/* src={`https://api.github.com/users/${username.name}`} */}
            </Text>

            <TextField
              value={username} 

              onChange={function handler(event){
                //Valor do evento
                const newUsername=event.target.value;
                //troca o valor da variavel no input
                setUsername(newUsername);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Login'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[400],
                mainColorLight: appConfig.theme.colors.primary[300],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}