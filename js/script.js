$(function(){
  //Tu jest kod do menu
  var tr1 = $('.triangle1');
  var tr2 = $('.triangle2');
  var tr3 = $('.triangle3');
  var tr4 = $('.triangle4');
  var gameMode = 0;
  
  //Animacja napisu
  var animate = $('div.hidden').fadeIn(3000);
  
  //Animacje elementów menu
  
  function animateMenu (triangle, addClass1, removeClass1, css1, text1) {
    triangle.addClass(addClass1);
    triangle.removeClass(removeClass1);
    triangle.css("left", css1);
    triangle.animate({'opacity': 0}, 50, function () { triangle.css("width", "360px"),
    triangle.text(text1);}).animate({'opacity': 1}, 1000);
  }
  
  tr1.one("mouseover", function(){
    animateMenu(tr1,"rectangle", "triangle1", "-180px", "1 Gracz")
  });
  
  tr2.one("mouseover",function(){
    animateMenu(tr2,"rectangle altBackground", "triangle2", "187px", "2 Graczy")
  });
  
  tr3.one("mouseover",function(){
    animateMenu(tr3,"rectangle altBackground", "triangle3", "-180px", "3 Graczy")
    tr3.css("top", "187px");
  });
  
  tr4.one("mouseover",function(){
    animateMenu(tr4,"rectangle", "triangle4", "187px", "4 Graczy")
    tr4.css("top", "187px");
    tr4.text('');
  });
  
  //Tu jest kod do gry
  
  var field = $('.col-1');
  var button = $('.changePlayer');
  var player = 0;
  var thisField = null;
  $('.game').hide();
  button.hide();
  
  //Zmiana z menu na grę
  
  function showGame(){
    $('.menu').fadeOut(500);
    $('.game').delay(500).fadeIn(1000);
    $('body').css('background-color', "#C0D860");
    button.delay(500).fadeIn(1000);
    $('.nameGame').animate({'font-size': '50px', 'opacity': 1}, 2000);
    $('.board').delay(500).fadeIn(1000);
  }
  
  //Zmiana ilości graczy
  
  tr2.on('click', function(){
    animate.stop();
    showGame();
    gameMode = 2;
  });
  
  tr3.on('click', function(){
    animate.stop();
    showGame();
    gameMode = 3;
  });
  
  tr4.on('click', function(){
    animate.stop();
    showGame();
    gameMode = 4;
  });
  
  //funkcja zmieniająca gracza
  
  function playerChange (playerNum) {
    player = playerNum;
    button.text('Gracz ' + playerNum);
  };
      
  //guzik zmiany gracza, w razie pomyłki aby można było naprawić błąd
    
  button.on('click',function(e){
    
    e.preventDefault();
    if (player == 0 || player == 2 && gameMode == 2) {
      playerChange(1);
    } else if (player == 1) {
      playerChange(2);
    } else if (gameMode == 3 && player == 2 || gameMode == 4 && player == 2) {
      playerChange(3);
    } else if (gameMode == 3 && player == 3) {
      playerChange(1);
    } else if (gameMode == 4 && player == 3) {
      playerChange(4);
    } else if (player == 4) {
      playerChange(1);
    }
  });  
    
  //Funkcja dodająca i usuwająca klasy
  
  function changeClasses (ClassAdd, remove1, remove2, remove3, remove4) {
    thisField.addClass(ClassAdd);
    thisField.removeClass(remove1);
    thisField.removeClass(remove2);
    thisField.removeClass(remove3);
    thisField.removeClass(remove4);
  }
  
  //mechanika podświetlania
  
   field.on('mouseover', function() {
     thisField = $(this);
        if(player == 2){
          
          if (thisField.hasClass('p2') == false) {
            changeClasses('p2Chose', 'p1Chose', 'p3Chose', 'p4Chose');
          } else {
            changeClasses('', 'p1Chose', 'p2Chose', 'p3Chose', 'p4Chose');
          }
          
        } else if (player == 1){
          
          if (thisField.hasClass('p1') == false) {
            changeClasses('p1Chose', 'p2Chose', 'p3Chose', 'p4Chose');
          } else {
            changeClasses('', 'p1Chose', 'p2Chose', 'p3Chose', 'p4Chose');
          }
        
        } else if (player == 3){
          
          if (thisField.hasClass('p3') == false) {
            changeClasses('p3Chose', 'p1Chose', 'p2Chose', 'p4Chose');
          } else {
            changeClasses('', 'p1Chose', 'p2Chose', 'p3Chose', 'p4Chose');
          }
          
        } else if (player == 4){
          
          if (thisField.hasClass('p4') == false) {
            changeClasses('p4Chose', 'p1Chose', 'p2Chose', 'p3Chose');
          } else {
            changeClasses('', 'p1Chose', 'p2Chose', 'p3Chose', 'p4Chose');
          }
          
        }
   });
  
  //funkcja odpowiadająca pokazywaniu się lub ukrywaniu diva z pytaniem
  
  function questions (display) {
    $('.question').css('display', display);
    $('.questionText').css('display', display);
  }
  
  //Mechanika pytań po klinięciu i zmian koloru (w przypadku pomyłki użytkownika)
  var random = null;
  var chosenQuestion = null;
  
  field.on('click', function(){
    if (player != 0 && thisField.hasClass('p1') == false && thisField.hasClass('p2') == false && thisField.hasClass('p3') == false && thisField.hasClass('p4') == false ) {
      
      random = Math.floor(Math.random() * $('.questionContent').length);
      chosenQuestion = $('.questionContent').hide().eq(random).show();
      
      questions('block');
      
    } else if (player == 1 && thisField.hasClass('p2') || player == 1 && thisField.hasClass('p3') || player == 1 && thisField.hasClass('p4')){
      
      changeClasses ('p1', 'p2', 'p3', 'p4', 'empty');
      
    } else if (player == 2 && thisField.hasClass('p1') || player == 2 && thisField.hasClass('p3') || player == 2 && thisField.hasClass('p4')){
      
      changeClasses ('p2', 'p1', 'p3', 'p4', 'empty');
      
    } else if (player == 3 && thisField.hasClass('p1') || player == 3 && thisField.hasClass('p2') || player == 3 && thisField.hasClass('p4')){
      
      changeClasses ('p3', 'p1', 'p2', 'p4', 'empty');
      
    } else if (player == 4 && thisField.hasClass('p1') || player == 4 && thisField.hasClass('p2') || player == 4 && thisField.hasClass('p3')){
      
      changeClasses ('p4', 'p1', 'p2', 'p3', 'empty');
      
    }
  });
  
  // po pomyślnym wykonaniu zadania
  
  $('.yes').on('click', function(a){
    
    if (chosenQuestion != null) {
      chosenQuestion.removeClass('questionContent');
      chosenQuestion.text('');
    }
  
    if (player == 1) {
      changeClasses ('p1', 'empty');
      questions('none');
      playerChange(2);
      gameEnd();
      
    } else if (player == 2 && gameMode == 2) {
      changeClasses ('p2', 'empty');
      questions('none');
      playerChange(1);
      gameEnd();
      
    } else if (player == 2 && gameMode == 3 || player == 2 && gameMode == 4 ) {
      changeClasses ('p2', 'empty');
      questions('none');
      playerChange(3);
      gameEnd();
      
    } else if (player == 3 && gameMode == 3) {
      changeClasses ('p3', 'empty');
      questions('none');
      playerChange(1);
      gameEnd();
      
    } else if (player == 3 && gameMode == 4) {
      changeClasses ('p3', 'empty');
      questions('none');
      playerChange(4);
      gameEnd();
      
    } else if (player == 4) {
      changeClasses ('p4', 'empty');
      questions('none');
      playerChange(1);
      gameEnd();
    }
    
  });
  
  // po niewykonaniu zadania

  $('.no').on('click', function(b){
    
    if(player == 1 && gameMode == 2) {
      changeClasses ('p2', 'p1', 'empty');
      questions('none');
      playerChange(2);
      
    } else if (player == 2 && gameMode == 2) {
      changeClasses ('p1', 'p2', 'empty');
      questions('none');
      playerChange(1);
      
    } else if (player == 1) {
      questions('none');
      playerChange(2);
      
    } else if (player == 2) {
      questions('none');
      playerChange(3);
      
    } else if (player == 3 && gameMode == 3) {
      questions('none');
      playerChange(1);
      
    } else if (player == 3 && gameMode == 4) {
      questions('none');
      playerChange(4);
      
    } else if (player == 4) {
      questions('none');
      playerChange(1);
    }
  });
  
  
  //Alert końca gry
  
  function gameEnd (){
    var winner = null;
    
    function fieldWinner (add, remove1, remove2, remove3) {
      field.removeClass(remove1);
      field.removeClass(remove2);
      field.removeClass(remove3);
      field.addClass(add);
    }
    
    if (field.hasClass('empty') == false) {
      
      if ( $('.p1').length > $('.p2').length && $('.p1').length > $('.p3').length && $('.p1').length > $('.p4').length ) {
        
        winner = "Gracz 1 wygrywa!";
        fieldWinner('p1', 'p2', 'p3', 'p4');
        playerChange(1);
        
      } else if ( $('.p2').length > $('.p1').length && $('.p2').length > $('.p3').length && $('.p2').length > $('.p4').length ) {
        
        winner = "Gracz 2 wygrywa!";
        fieldWinner('p2', 'p1', 'p3', 'p4');
        playerChange(2);
        
      } else if ( $('.p3').length > $('.p2').length && $('.p3').length > $('.p1').length && $('.p3').length > $('.p4').length ) {
        
        winner = "Gracz 3 wygrywa!";
        fieldWinner('p3', 'p2', 'p1', 'p4');
        playerChange(3);
        
      } else if ( $('.p4').length > $('.p2').length && $('.p4').length > $('.p3').length && $('.p4').length > $('.p1').length ) {
        
        winner = "Gracz 4 wygrywa!";
        fieldWinner('p4', 'p2', 'p3', 'p1');
        playerChange(4);
        
      } else {
        winner = "Remis!";
        
      }
      alert(winner);
    }
  }
  
});

//dodać przycisk powrotu do wyboru ilości graczy
//dodać responsywność (breakpointy)
//dodać licznik wypitego alko i ilość punktów
//dodać jakiś font
//dodać nowe pytania
  