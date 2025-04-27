/* космический фон + анимация звёзд */
body {
  margin: 0;
  height: 100vh;
  overflow: hidden;
  background: #000;
  position: relative;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}
body::before, body::after {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: transparent url('data:image/svg+xml;utf8,\
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">\
      <circle cx="50%" cy="50%" r="1" fill="white" opacity="0.3"/>\
    </svg>') repeat;
  animation: moveStars 60s linear infinite;
}
body::after {
  animation-duration: 120s;
  opacity: 0.5;
}

@keyframes moveStars {
  from { transform: translateY(0) translateX(0); }
  to   { transform: translateY(-1000px) translateX(-500px); }
}

/* карточки и контейнер */
.container {
  position: relative;
  z-index: 10;
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  padding: 24px;
  max-width: 360px;
  width: 100%;
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

h1 {
  margin-top: 0;
  text-align: center;
  color: #333;
}
.plans {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}
.plan {
  flex: 1;
  text-align: center;
  background: #f3f3f3;
  border-radius: 8px;
  padding: 12px 8px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}
.plan:hover {
  transform: translateY(-4px);
  background: #fff;
}
.plan.active {
  background: #4f46e5;
  color: #fff;
}

.selection {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
label {
  font-size: 0.85rem;
  color: #555;
}
select, input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.2s;
}
select:focus, input:focus {
  border-color: #4f46e5;
}

.pay {
  margin-top: 12px;
  padding: 12px;
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.pay:hover {
  background: #0ea270;
  transform: translateY(-2px);
}
