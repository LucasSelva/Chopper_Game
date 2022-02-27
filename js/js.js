function start() { // Inicio da função start()
//onclick no html, ira iniciar essa function:
	$("#inicio").hide();//possivel por causa do jquery
    //ao iniciar o jogo a div #inicio será oculta
	
    //e também serãocriadas eas seguintes divs:
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");//div com o life

    //Principais variáveis do jogo
    var podeAtirar=true;
    var fimdejogo=false;
    var pontos=0;//pontuação do placar
    var salvos=0;
    var perdidos=0;
    var energiaAtual=3;//energia
    var jogo = {}
    var velocidade=5;//aumente e aumenta a dificuldade, a cada abatimento
    var posicaoY = parseInt(Math.random() * 334);
    var TECLA = {//array
        W: 87,//esse é o keycode, o valor mapa das teclas
        S: 83,
        D: 68
        }
    
        jogo.pressionou = [];
    //sons que dependem de colisoes
    var somDisparo=document.getElementById("somDisparo");
    var somExplosao=document.getElementById("somExplosao");
    var musica=document.getElementById("musica");
    var somGameover=document.getElementById("somGameover");
    var somPerdido=document.getElementById("somPerdido");
    var somResgate=document.getElementById("somResgate");
    //Música em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

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
    placar();
    energia();//chana a afunção que atualiza a div energia
	
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

        somDisparo.play();            
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
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        //em outras palavras, as divs jogador e inimigo1 colidem
        //jogador com o inimigo1
        //quando acontecer, a avar colisao1 receberá uma serie de informaçoes
        //só importa para o exercicio se houve colisao ou nao
            
        if (colisao1.length>0) {//houve colisao
        energiaAtual--;//se colidir com o inigigo1, perde 1 energia      
        inimigo1X = parseInt($("#inimigo1").css("left"));//explosao onde o inimigo1 está
        inimigo1Y = parseInt($("#inimigo1").css("top"));
        explosao1(inimigo1X,inimigo1Y);//chama a função explosao
        
        posicaoY = parseInt(Math.random() * 334);//reposiciona o inimigo1
        $("#inimigo1").css("left",694);
        $("#inimigo1").css("top",posicaoY);
        }

        // jogador com o inimigo2 
        if (colisao2.length>0) {
        energiaAtual--;	
        inimigo2X = parseInt($("#inimigo2").css("left"));
        inimigo2Y = parseInt($("#inimigo2").css("top"));
        explosao2(inimigo2X,inimigo2Y);
                
        $("#inimigo2").remove();//alguns segundos depois ele volta
            
        reposicionaInimigo2();//chama a função que recria o inimigo2
            
        }
        // Disparo com o inimigo1
		
	    if (colisao3.length>0) {		
        pontos=pontos+100;//ganha 100pts se atingir o inimigo 1 com, 1 tiro
        velocidade=velocidade+0.3;
        inimigo1X = parseInt($("#inimigo1").css("left"));
        inimigo1Y = parseInt($("#inimigo1").css("top"));
            
        explosao1(inimigo1X,inimigo1Y);//reaproveita a function explosao1
        $("#disparo").css("left",950);//impede que disparo atravesse o inimigo
        //se a posição doi disparo for maior que 900 ele retorna            
        posicaoY = parseInt(Math.random() * 334);//reposiciona o inimigo na tela
        $("#inimigo1").css("left",694);
        $("#inimigo1").css("top",posicaoY);            
        }    
        // Disparo com o inimigo2
		
	    if (colisao4.length>0) {
        pontos=pontos+50;
        inimigo2X = parseInt($("#inimigo2").css("left"));
        inimigo2Y = parseInt($("#inimigo2").css("top"));
        $("#inimigo2").remove();
    
        explosao2(inimigo2X,inimigo2Y);
        $("#disparo").css("left",950);//devolve o diparo, encerrando a função
        
        reposicionaInimigo2();// chama a função já criada            
        }
        // jogador com o amigo
		
	    if (colisao5.length>0) {
        salvos++;//salvos +1
        somResgate.play();
        reposicionaAmigo();
        $("#amigo").remove();//a div amigo sai da tela
        }

        //Inimigo2 com o amigo
		
        if (colisao6.length>0) {
        perdidos++;//quando inimigo2 atingir amigo +1, que será subtraido
        amigoX = parseInt($("#amigo").css("left"));//posição atual do amigo
        amigoY = parseInt($("#amigo").css("top"));
        explosao3(amigoX,amigoY);//chama a função
        $("#amigo").remove();
            
        reposicionaAmigo();//chama a função
            
        }
        } //Fim da função colisao()

    //Explosão 1
    function explosao1(inimigo1X,inimigo1Y) {
    somExplosao.play();
	$("#fundoGame").append("<div id='explosao1'></div");//cria a div explosao, que receberá elmentos CSS, daqui mesmo
	$("#explosao1").css("background-image", "url(imgs/explosao.png)");
	var div=$("#explosao1");//nova variavel para simplificar
	div.css("top", inimigo1Y);
	div.css("left", inimigo1X);
	div.animate({width:200, opacity:0}, "slow");//JQuery, tamanho da div explosao, some com opacity 0
	
	var tempoExplosao=window.setInterval(removeExplosao, 1000);//remove a explosao
	
		function removeExplosao() {
			
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;			
		}
		
	} // Fim da função explosao1()

    //Reposiciona Inimigo2
	
	function reposicionaInimigo2() {//chamada apos o inimigo2 ser destruido
	
        var tempoColisao4=window.setInterval(reposiciona4, 5000);//chama função em 5 sec
            
            function reposiciona4() {
            window.clearInterval(tempoColisao4);//remove a função de tempo
            tempoColisao4=null;
                
                if (fimdejogo==false) {//se o jogo acabou, o inimigo não é criado
                
                $("#fundoGame").append("<div id=inimigo2></div");
                
                }
                
            }	
        }	
        //Explos�o2
	
	    function explosao2(inimigo2X,inimigo2Y) {//identica a 1
        somExplosao.play();	
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2=$("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
        
            function removeExplosao2() {
                
                div2.remove();
                window.clearInterval(tempoExplosao2);
                tempoExplosao2=null;                
            }            
            
        } // Fim da fun��o explosao2()
        //Reposiciona Amigo
	
	    function reposicionaAmigo() {
	
            var tempoAmigo=window.setInterval(reposiciona6, 6000);//6 sec
        
            function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo=null;
            
            if (fimdejogo==false) {
            
            $("#fundoGame").append("<div id='amigo' class='anima3'></div>");//recria o amigo se o jogo nao chegou ao final
            
            }
            
        }
                
    } // Fim da fun��o reposicionaAmigo()
    //Explosão3

    function explosao3(amigoX,amigoY) {
        somPerdido.play();
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");//criara a adiv explisao, com a classe anima4, que ser´pa chgamada pelo CSS
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);
        var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
        $("#explosao3").remove();
        window.clearInterval(tempoExplosao3);
        tempoExplosao3=null;            
        }    
    } // Fim da fun��o explosao3
    function placar() {//atualiza a div placar
	
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
        
    } //fim da função placar()

    //Barra de energia
    function energia() {
        
        if (energiaAtual==3) {
            //se energia=3 será exibida a imagem na id tag energia como bg
            $("#energia").css("background-image", "url(imgs/energia3.png)");
        }

        if (energiaAtual==2) {
            
            $("#energia").css("background-image", "url(imgs/energia2.png)");
        }

        if (energiaAtual==1) {
            
            $("#energia").css("background-image", "url(imgs/energia1.png)");
        }

        if (energiaAtual==0) {
            
            $("#energia").css("background-image", "url(imgs/energia0.png)");
            
            //Game Over
        }

    } // Fim da função energia()
    
} // Fim da função start