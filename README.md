## 👁️ Human Eye Tracker Login Page

This futuristic login page includes:
- Animated IP scanner background
- Interactive 3D hover effects
- Realistic human eye that follows your mouse
- When idle, the eye moves randomly as if it's scanning

🔒 **Tech:** HTML, CSS, JavaScript (Vanilla)

---

### 📄 Full Source Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login | Human Eye Tracker</title>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Orbitron', monospace;
    }

    body {
      background: black;
      color: #0f0;
      overflow: hidden;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .scanner-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #0f0;
      font-size: 14px;
      line-height: 20px;
      opacity: 0.1;
      pointer-events: none;
      white-space: pre-wrap;
      font-family: 'Courier New', Courier, monospace;
      animation: scroll 10s linear infinite;
      z-index: 1;
    }

    @keyframes scroll {
      from { transform: translateY(100%); }
      to { transform: translateY(-100%); }
    }

    .eye {
      position: relative;
      width: 100px;
      height: 100px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 0 20px #0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      z-index: 10;
      margin-bottom: 20px;
    }

    .iris {
      width: 50px;
      height: 50px;
      background: radial-gradient(circle at center, #0f0 0%, #004400 60%, #000 100%);
      border-radius: 50%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.05s;
    }

    .pupil {
      width: 15px;
      height: 15px;
      background: black;
      border-radius: 50%;
      box-shadow: 0 0 5px #0f0;
    }

    .login-box {
      position: relative;
      background: rgba(0, 255, 0, 0.05);
      border: 1px solid #0f0;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 0 15px #0f0;
      z-index: 10;
      transition: transform 0.1s ease, box-shadow 0.1s ease;
      will-change: transform;
    }

    .login-box:hover {
      box-shadow: 0 0 25px #0f0, 0 0 40px #0f0 inset;
    }

    .login-box h2 {
      margin-bottom: 20px;
      color: #0f0;
      text-align: center;
    }

    .login-box input {
      width: 100%;
      padding: 10px;
      background: black;
      border: 1px solid #0f0;
      color: #0f0;
      margin-bottom: 20px;
      outline: none;
      border-radius: 5px;
    }

    .login-box button {
      width: 100%;
      padding: 10px;
      background: #0f0;
      border: none;
      color: black;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
      transition: background 0.3s;
    }

    .login-box button:hover {
      background: #0a0;
    }
  </style>
</head>
<body>

  <div class="scanner-bg" id="ipScanner"></div>

  <!-- Human-Like Eye -->
  <div class="eye" id="eye">
    <div class="iris" id="iris">
      <div class="pupil"></div>
    </div>
  </div>

  <div class="login-box" id="loginBox">
    <h2>Secure Login</h2>
    <input type="text" placeholder="Username">
    <input type="password" placeholder="Password">
    <button>Login</button>
  </div>

  <script>
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

    // Human Eye Tracking + Idle movement
    const eye = document.getElementById('eye');
    const iris = document.getElementById('iris');
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

      // Eye tracking
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

      stopRandomMovement(); // stop idle animation

      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        isMouseMoving = false;
        startRandomMovement();
      }, 2000);
    });

    document.addEventListener('mouseleave', () => {
      startRandomMovement();
    });
  </script>

</body>
</html>
