export default class NotificationMessage {
    // static duration;
    static counter = 0;;

    constructor(message = '',
        {
            duration = 0,
            type = ''
        } = {}) {
            this.message = message;
            this.duration = duration;
            this.type = type;
            NotificationMessage.counter++;

            this.render();
    }

    getTemplate() {
        return `
        <div class="notification" style="--value:20s">
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

    show(parentElement = {}) {
        if (NotificationMessage.counter < 2) {
            parentElement ? parentElement.append(this.element) : document.body.append(this.element);
        }
        // update timer
        this.element.style["--value"] = '20s';
        console.log(this.element.style);
    }

    destroy() {
        this.element.remove();
    }
}
