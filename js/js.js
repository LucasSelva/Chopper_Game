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
    var podeAtirar=true;
    var jogo = {}
    var velocidade=5;
    var posicaoY = parseInt(Math.random() * 334);
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
    moveinimigo1();
    moveinimigo2();
    moveamigo();
    colisao();
	
	} // Fim da função loop()
    //Função que movimenta o fundo do jogo
	
	function movefundo() {
	
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
        
        } // fim da função movefundo()
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
                disparo();                
                //Chama função Disparo	
            }
        
    } // fim da função movejogador()
    function moveinimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);
            
            if (posicaoX<=0) {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
                
            }
    } //Fim da função moveinimigo1()
    function moveinimigo2() {
    posicaoX = parseInt($("#inimigo2").css("left"));
	$("#inimigo2").css("left",posicaoX-3);
				
		if (posicaoX<=0) {
			
		$("#inimigo2").css("left",775);
					
		}
    } // Fim da fun��o moveinimigo2()
    function moveamigo() {
	
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+1);
                    
            if (posicaoX>906) {
                
            $("#amigo").css("left",0);
                        
            }   
    } // fim da função moveamigo()
    function disparo() {
	
        if (podeAtirar==true) {
            
        podeAtirar=false;//altera p/ false, logo nao pode dar 2 tiros
        
        topo = parseInt($("#jogador").css("top"))//a posiçao do helicotero, de onde saira o disparo
        posicaoX= parseInt($("#jogador").css("left"))
        tiroX = posicaoX + 190;//para que o tiro saia do meio da nave
        topoTiro=topo+42;//para que saia na altura frente da nave
        $("#fundoGame").append("<div id='disparo'></div");//cria a div no html
        $("#disparo").css("top",topoTiro);//caracteriscas dadas ao CSS dessa div
        $("#disparo").css("left",tiroX);
        
        var tempoDisparo=window.setInterval(executaDisparo, 30);
        //window.setInterval é a função de tempo (executa a função, nesse intervalo de segundos)
        } //Fecha podeAtirar
     
            function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+15); //se move de 15 em 15px
    
                    if (posicaoX>900) {//o fim de fundo game
                            
                window.clearInterval(tempoDisparo);
                tempoDisparo=null;//zera tempoDisparo
                $("#disparo").remove();//remove disparo da tela
                podeAtirar=true;// pode atirar volta a ser true, e executavel
                        
                       }
        } // Fecha executaDisparo()
    } // Fecha disparo()
    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));//a .collision pertence ao JQuery collision
        //em outras palavras, as divs jogador e inimigo1 colidem
        // jogador com o inimigo1
        //quando acontecer, a avar colisao1 receberá uma serie de informaçoes
        //só importa para o exercicio se houve colisao ou nao     
    
        console.log(colisao1);
    
    } //Fim da função colisao()

} // Fim da função start