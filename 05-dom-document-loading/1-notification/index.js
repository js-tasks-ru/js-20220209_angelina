export default class NotificationMessage {
    static activeNotification; // undefined

    constructor(message = '',
        {
            duration = 0,
            type = ''
        } = {}) {
            this.message = message;
            this.duration = duration;
            this.type = type;
            this.durationInSeconds = (duration / 1000) + 's';

            this.render();
    }

    getTemplate() {
        return `
        <div class="notification" style="--value:${this.durationInSeconds}">
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                    ${this.message}
                </div>
            </div>
        </div>
        `
    }

    render() {
        const element = document.createElement('div');
        
        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;

        if (this.type !== '') {
            this.element.classList.add(this.type);
        }
    }

    show(parentElement = document.body) {
        if (NotificationMessage.activeNotification) {
            NotificationMessage.activeNotification.remove();
        }

        parentElement.append(this.element);

        this.timerId = setTimeout(() => {
            this.remove();
        }, this.duration);

        NotificationMessage.activeNotification = this;
    }

    remove() {
        clearTimeout(this.timerId);

        if (this.element) {
            this.element.remove();
        }
        
    }

    destroy() {
        this.remove();
        this.element = null;
        NotificationMessage.activeNotification = null;
    }
}
