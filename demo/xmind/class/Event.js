export default class Event {
    constructor(mindmap) {
      this.mindmap = mindmap;
      this.setupWheelEvent();
      this.setupDragEvent();
      this.setupTouchEvent();
    }
  
    setupWheelEvent() {
      this.mindmap.container.addEventListener('wheel', e => {
        e.preventDefault();
        const rect = this.mindmap.container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const x = (mouseX - this.mindmap.offsetX) / this.mindmap.scale;
        const y = (mouseY - this.mindmap.offsetY) / this.mindmap.scale;
        const scaleFactor = e.deltaY > 0 ? (1 - this.mindmap.config.map.zoomStep) : (1 + this.mindmap.config.map.zoomStep);
        const newScale = this.mindmap.scale * scaleFactor;
  
        if (newScale >= this.mindmap.config.map.zoomMin && newScale <= this.mindmap.config.map.zoomMax) {
          this.mindmap.scale = newScale;
          this.mindmap.offsetX = mouseX - x * this.mindmap.scale;
          this.mindmap.offsetY = mouseY - y * this.mindmap.scale;
          this.mindmap.wrapper.style.transform = `translate(${this.mindmap.offsetX}px, ${this.mindmap.offsetY}px) scale(${this.mindmap.scale})`;
        }
      });
    }
  
    setupDragEvent() {
        let isDragging = false;
        let startX, startY;
        let initialOffsetX, initialOffsetY;

        this.mindmap.container.addEventListener('mousedown', e => {
            if (e.target === this.mindmap.container || e.target === this.mindmap.wrapper) {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                initialOffsetX = this.mindmap.offsetX;
                initialOffsetY = this.mindmap.offsetY;
            }
        });

        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            this.mindmap.offsetX = initialOffsetX + deltaX;
            this.mindmap.offsetY = initialOffsetY + deltaY;
            
            this.mindmap.wrapper.style.transform = 
                `translate(${this.mindmap.offsetX}px, ${this.mindmap.offsetY}px) scale(${this.mindmap.scale})`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    setupTouchEvent() {
        let lastTouchDistance = 0;
        let isDragging = false;
        let startX, startY;
        let initialOffsetX, initialOffsetY;

        this.mindmap.container.addEventListener('touchstart', e => {
            if (e.target === this.mindmap.container || e.target === this.mindmap.wrapper) {
                isDragging = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                initialOffsetX = this.mindmap.offsetX;
                initialOffsetY = this.mindmap.offsetY;

                if (e.touches.length === 2) {
                    lastTouchDistance = Math.hypot(
                        e.touches[0].clientX - e.touches[1].clientX,
                        e.touches[0].clientY - e.touches[1].clientY
                    );
                }
            }
        });

        this.mindmap.container.addEventListener('touchmove', e => {
            e.preventDefault();
            
            if (e.touches.length === 2) {
                // 处理缩放
                const distance = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );

                const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
                const rect = this.mindmap.container.getBoundingClientRect();
                const x = (midX - rect.left - this.mindmap.offsetX) / this.mindmap.scale;
                const y = (midY - rect.top - this.mindmap.offsetY) / this.mindmap.scale;

                const scaleFactor = distance / lastTouchDistance;
                const newScale = this.mindmap.scale * scaleFactor;

                if (newScale >= this.mindmap.config.map.zoomMin && newScale <= this.mindmap.config.map.zoomMax) {
                    this.mindmap.scale = newScale;
                    this.mindmap.offsetX = midX - rect.left - x * this.mindmap.scale;
                    this.mindmap.offsetY = midY - rect.top - y * this.mindmap.scale;
                    this.mindmap.wrapper.style.transform = 
                        `translate(${this.mindmap.offsetX}px, ${this.mindmap.offsetY}px) scale(${this.mindmap.scale})`;
                }

                lastTouchDistance = distance;
            } else if (isDragging) {
                // 处理拖动
                const deltaX = e.touches[0].clientX - startX;
                const deltaY = e.touches[0].clientY - startY;
                
                this.mindmap.offsetX = initialOffsetX + deltaX;
                this.mindmap.offsetY = initialOffsetY + deltaY;
                
                this.mindmap.wrapper.style.transform = 
                    `translate(${this.mindmap.offsetX}px, ${this.mindmap.offsetY}px) scale(${this.mindmap.scale})`;
            }
        });

        this.mindmap.container.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
  }