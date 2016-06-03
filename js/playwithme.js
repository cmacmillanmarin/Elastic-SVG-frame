//
// playwithme.js

//
// AUTHOR
//
// Developed by Christian MacMillan in 2016 
// https://github.com/cmacmillanmarin
// hello@christian-macmillan.com
//

//
// VARIABLES
//

var path = document.getElementById('box'),          // Path obj
    spring = .4,                                    // Spring      -  from 0 to 1 values
    friction = .8,                                  // Friction    -  from 0 to 1 values 
    easing = .1,                                    // Easing      -  from 0.05 to 0.25 values
    elasticity = 100,                               // Elasticity  -  from 50 to 200 (recommended, you can play whatever you want, 200 to see her face (: )
    retention = 25,                                 // Retention   -  from 25 to 100 (recommended, you can play whatever you want)
    vy = 0,                                         // vy          -  constant
    sy = 200,                                       // sx          -  constant  
    dy = 100,                                       // dy          -  constant
    sx = 50,                                        // sy          -  constant

    released = true,                                // released    -  false when user makes a click / true in any other case
    up = false,                                     // up          -  false when the cursor is at the bottom part of the window / true in any other case
    down = false                                    // down        -  false when the cursor is at the top part of the window / true in any other case 

//
// END VARIABLES
//
  
//
//  JS
//

init()

// init()
// Inits the animation and sets the event listeners
//
function init() {
    
    animation()
    
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mousedown', onMousedown)
    document.addEventListener('mouseup', onMouseup)
    
}

//  animation()
//  Updates the box path data according to the mouse events values. 
//  This function is recursive, take care of this.
//
function animation() {
        
    if (released) {
      
        vy += (dy - sy) * spring
        sy += (vy *= friction)

    } else {

        sy += (dy - sy) * easing

    }

    path.setAttribute('d', 'M0,0 H100 V100 Q' + sx + ',' + sy + ' 0,100')
        
    requestAnimationFrame(animation)
    
}
    
// bounce()
// Makes the bounce, set the bounce values and indicates to animation function 
// that it has to do the bounce effect
//    
function bounce(a,e) {
        
    released = false
        
    switch(a) {
        case -1:
            dy = dy + elasticity
            break
        case 1:
            dy = dy - elasticity
            break
        default:
            break
        
    }
            
}
  	
// release()
// Releases the animation, set the initial values and indicates to animation function 
// that it has to do the release effect
//
function release() {
      
    released = true
    dy = 100
  
}

// onMousemove()
// Checks the cursor position and calls the bounce if needed. Updates the sx point.
//
function onMousemove(e) {
    
    if (e.clientY > parseInt(window.innerHeight/2)) {
        
        if (down) {
            bounce(-1,e)
            setTimeout(release,retention)
            down = false
        }
        up = true
    
    } else {
        
        if (up) {
            bounce(1,e)
            setTimeout(release,retention)
            up = false
        }
        down = true
    
    }
    
    sx = Math.abs(((e.clientX / window.innerWidth) * 100))

}
    
// onMousedown()
// Checks the cursor position and calls the bounce if needed.
//
function onMousedown(e) {

    if (e.clientY < (window.innerHeight / 2)) { 
          
        bounce(1,e)
      
    } else {
        
        bounce(-1,e)
      
    }
  
}

// onMouseup()
// Calls the release function 
//
function onMouseup() { release() }

//
//  END JS
//
