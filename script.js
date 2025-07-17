
// Custom cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 100);
});

// Feature card mouse effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Terminal animation with realistic workflow automation demo
const terminal = document.getElementById('terminal');
const tasksFoundEl = document.querySelector('#tasks-found .demo-stat-value');
const hoursSavedEl = document.querySelector('#hours-saved .demo-stat-value');
const roiDaysEl = document.querySelector('#roi-days .demo-stat-value');

const terminalSequence = [
    {
        type: 'command',
        prompt: '$',
        command: ' droidspeak analyze --business "Local Service Co"',
        delay: 1000
    },
    {
        type: 'output',
        text: '🚀 Scanning your business processes...',
        delay: 500
    },
    {
        type: 'output',
        text: '🔍 Analyzing time-wasting activities...',
        delay: 700
    },
    {
        type: 'blank',
        delay: 300
    },
    {
        type: 'progress',
        text: 'Checking social media management:',
        progress: 100,
        delay: 1500
    },
    {
        type: 'output',
        text: '📱 Found: <span class="terminal-highlight">16 hours/week</span> on manual posting',
        delay: 400
    },
    {
        type: 'progress',
        text: 'Analyzing appointment booking:',
        progress: 100,
        delay: 1200
    },
    {
        type: 'output',
        text: '📅 Found: <span class="terminal-highlight">8 hours/week</span> on phone tag',
        delay: 400
    },
    {
        type: 'progress',
        text: 'Checking lead follow-up:',
        progress: 100,
        delay: 1400
    },
    {
        type: 'output',
        text: '💬 Found: <span class="terminal-highlight">47% missed follow-ups</span>',
        delay: 600
    },
    {
        type: 'blank',
        delay: 500
    },
    {
        type: 'command',
        prompt: '$',
        command: ' droidspeak deploy --automation-suite',
        delay: 800
    },
    {
        type: 'output',
        text: '⚡ Deploying automated social media system...',
        delay: 600
    },
    {
        type: 'output',
        text: '📅 Setting up smart scheduling system...',
        delay: 800
    },
    {
        type: 'output',
        text: '🤖 Configuring follow-up automation...',
        delay: 700
    },
    {
        type: 'output',
        text: '✅ All systems are now LIVE!',
        class: 'terminal-success',
        delay: 600
    },
    {
        type: 'blank',
        delay: 300
    },
    {
        type: 'output',
        text: '📊 <span class="terminal-highlight">24 hours saved</span> per week',
        class: 'terminal-success',
        delay: 500
    },
    {
        type: 'output',
        text: '💰 <span class="terminal-highlight">$6,000/month</span> in recovered time value',
        class: 'terminal-success',
        delay: 500
    },
    {
        type: 'output',
        text: '🚀 <span class="terminal-highlight">3x faster</span> lead response time',
        class: 'terminal-success',
        delay: 500
    }
];

let sequenceIndex = 0;
let isAnimating = false;

function createTerminalLine(item) {
    const line = document.createElement('div');
    line.className = 'terminal-line';

    if (item.type === 'command') {
        line.innerHTML = `<span class="terminal-prompt">${item.prompt}</span><span class="terminal-command">${item.command}</span><span class="terminal-cursor"></span>`;
    } else if (item.type === 'output') {
        line.innerHTML = `<span class="terminal-output ${item.class || ''}">${item.text}</span>`;
    } else if (item.type === 'progress') {
        line.innerHTML = `
            <span class="terminal-output">${item.text}</span>
            <span class="terminal-progress">
                <span class="terminal-progress-bar" style="animation-duration: ${item.delay}ms; width: ${item.progress}%"></span>
            </span>
        `;
    } else if (item.type === 'blank') {
        line.innerHTML = '&nbsp;';
    }

    return line;
}

function animateValue(element, endValue, duration = 1000) {
    const startValue = parseFloat(element.textContent) || 0;
    const increment = (endValue - startValue) / (duration / 16);
    let currentValue = startValue;

    const timer = setInterval(() => {
        currentValue += increment;
        if ((increment > 0 && currentValue >= endValue) || (increment < 0 && currentValue <= endValue)) {
            currentValue = endValue;
            clearInterval(timer);
        }
        element.textContent = currentValue % 1 === 0 ? currentValue : currentValue.toFixed(1);
    }, 16);
}

function runTerminalSequence() {
    if (sequenceIndex >= terminalSequence.length) {
        // Reset and loop
        setTimeout(() => {
            terminal.innerHTML = '';
            sequenceIndex = 0;
            if (tasksFoundEl) tasksFoundEl.textContent = '0';
            if (hoursSavedEl) hoursSavedEl.textContent = '0';
            if (roiDaysEl) roiDaysEl.textContent = '0';
            document.querySelectorAll('.demo-stat').forEach(stat => stat.classList.remove('active'));
            runTerminalSequence();
        }, 3000);
        return;
    }

    const item = terminalSequence[sequenceIndex];
    const line = createTerminalLine(item);

    // Remove cursor from previous line
    const previousCursor = terminal.querySelector('.terminal-cursor');
    if (previousCursor) {
        previousCursor.remove();
    }

    terminal.appendChild(line);

    // Auto-scroll to bottom
    terminal.scrollTop = terminal.scrollHeight;
    // Update stats if needed
    if (item.updateStat && item.updateStat.element) {
        setTimeout(() => {
            item.updateStat.element.parentElement.classList.add('active');
            animateValue(item.updateStat.element, item.updateStat.value);
        }, 300);
    }

    sequenceIndex++;
    setTimeout(runTerminalSequence, item.delay);
}

// Start animation when hero demo section is in view
const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isAnimating) {
            isAnimating = true;
            runTerminalSequence();
            demoObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

demoObserver.observe(document.querySelector('.hero-demo'));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Contact form
function showContactForm() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactForm() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.getElementById('assessmentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! We\'ll send your custom AI assessment within 24 hours.');
    closeContactForm();
});

// Draw chart
const canvas = document.getElementById('hoursChart');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Simple line chart
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const points = [20, 35, 40, 55, 60, 75, 85, 95];
    const spacing = canvas.width / (points.length - 1);

    points.forEach((point, index) => {
        const x = index * spacing;
        const y = canvas.height - (point / 100 * canvas.height);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}
