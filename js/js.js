function start() { // Inicio da função start()
//onclick no html, ira iniciar essa funtion:
	$("#inicio").hide();//possivel por causa do jquery
    //ao iniciar o jogo a div #inicio será oculta
	
    //e também serãocriadas eas seguintes divs:
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

    //Principais variáveis do jogo
    var jogo = {}
    var TECLA = {//array
        W: 87,//esse é o keycode, o valor mapa das teclas
        S: 83,
        D: 68
        }
    
        jogo.pressionou = [];

        //Verifica se o usu�rio pressionou alguma tecla	
	
	    $(document).keydown(function(e){//keydown verifica se a tecla foi pressionada
        jogo.pressionou[e.which] = true;//se teclou algo, true
        });
    
    
        $(document).keyup(function(e){//keyup quer dizer que nada foi pressionado
           jogo.pressionou[e.which] = false;//se não tecloum falso
        });
	
	//Game Loop

	jogo.timer = setInterval(loop,30);
	
	function loop() {

	
	movefundo();
    movejogador();
	
	} // Fim da função loop()
    //Função que movimenta o fundo do jogo
	
	function movefundo() {
	
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
        
        } // fim da fun��o movefundo()
    function movejogador() {
	
            if (jogo.pressionou[TECLA.W]) {
                var topo = parseInt($("#jogador").css("top"));//a propriedade top no css da id jogador
                $("#jogador").css("top",topo-10);//atualiza a posição relativa do jogador na div fundogame -10px
                    if (topo<=0) {
		
                    $("#jogador").css("top",topo+10);//isso vai zerar em 0, quando top for 0 e o jogador pressionar W, -10 + 10 vai dar 0
                }
            
            }
            
            if (jogo.pressionou[TECLA.S]) {
                
                var topo = parseInt($("#jogador").css("top"));
                $("#jogador").css("top",topo+10);
                    if (topo>=450) {
		
                    $("#jogador").css("top",topo-10);//isso vai zerar em 0, quando top for 0 e o jogador pressionar S, -10 + 10 vai dar 0
                }	
            }
            
            if (jogo.pressionou[TECLA.D]) {
                
                //Chama função Disparo	
            }
        
    } // fim da função movejogador()

} // Fim da função start