/*O next permite que este arquivo encapsule todas as outras páginas.
 * As definições deste arquivo será replicado para as demais páginas*/

//Funções Globais
function GlobalStyle(){
	return(
		<style global jsx>{`
			*{
				margin: 0;
				padding: 0;
				box-sizing: border-box;
				list-style: none;
			}

			body{
				font-family: 'Open Sans', sans-serif;
			}
			
			/*App fit Height*/
			html, body, #__next{
				min-height: 100vh;
				display: flex;
				flex: 1;
			}

			#__next{
				flex: 1;
			}
			#__next>*{
				flex: 1;
			}
		`}</style>
	);
}

export default function GlobalApp({ Component, pageProps}){
    return(<>
        <GlobalStyle/>
        <Component {...pageProps}/>
    </>
    );
}