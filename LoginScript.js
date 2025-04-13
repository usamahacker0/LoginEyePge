    // IP Scanner effect
    const scanner = document.getElementById("ipScanner");
    const generateIP = () => {
      return Array.from({ length: 300 }, () => {
        return `${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}`;
      }).join('\n');
    };
    scanner.textContent = generateIP();
    setInterval(() => {
      scanner.textContent = generateIP();
    }, 10000);

    // Hover feather (tilt) effect
    const box = document.getElementById('loginBox');
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      const rotateX = y * 15;
      const rotateY = x * -15;
      box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    document.addEventListener('mouseleave', () => {
      box.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });

    // Human Eye Tracking
    const eye = document.getElementById('eye');
    const iris = document.getElementById('iris');

    document.addEventListener('mousemove', (e) => {
      const eyeRect = eye.getBoundingClientRect();
      const centerX = eyeRect.left + eyeRect.width / 2;
      const centerY = eyeRect.top + eyeRect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy), 25); // Limit how far it moves

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      iris.style.transform = `translate(${x}px, ${y}px)`;
    });
      let isMouseMoving = true;
      let idleTimeout;
      let randomMoveInterval;
    
      function moveIrisRandomly() {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 25;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        iris.style.transform = `translate(${x}px, ${y}px)`;
      }
    
      function startRandomMovement() {
        if (!randomMoveInterval) {
          randomMoveInterval = setInterval(moveIrisRandomly, 1000);
        }
      }
    
      function stopRandomMovement() {
        clearInterval(randomMoveInterval);
        randomMoveInterval = null;
      }
    
      document.addEventListener('mousemove', (e) => {
        isMouseMoving = true;
    
        // Eye tracking code
        const eyeRect = eye.getBoundingClientRect();
        const centerX = eyeRect.left + eyeRect.width / 2;
        const centerY = eyeRect.top + eyeRect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.hypot(dx, dy), 25);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        iris.style.transform = `translate(${x}px, ${y}px)`;
    
        stopRandomMovement(); // Stop random movement when mouse is active
    
        clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
          isMouseMoving = false;
          startRandomMovement(); // Start random movement after 2s idle
        }, 2000);
      });
    
      document.addEventListener('mouseleave', () => {
        startRandomMovement();
      });