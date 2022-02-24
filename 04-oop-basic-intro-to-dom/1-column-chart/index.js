export default class ColumnChart {
    chartHeight = 50;
    subElements = {};

    constructor({
        data = [],
        value = 0,
        label = '',
        link = '',
        formatHeading = data => data
    } = {}) {
        this.data = data;
        this.label = label;
        this.link = link;
        this.value = formatHeading(value);

        this.render();
    }

    getTemplate() {
        return `
        <div class="column-chart column-chart_loading" style="--chart-height: 50">
            <div class="column-chart__title">
                Total ${this.label}
                ${this.getLink()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.value}</div>
                <div data-element="body" class="column-chart__chart">
                    ${this.getColumnBody()}
                </div>
            </div>
        </div>
        `
    } 

    render() {
        const element = document.createElement('div');

        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;

        if (this.data.length !== 0) {
            this.element.classList.remove('column-chart_loading');
        }

        this.subElements = this.getSubElements();
    }

    update({
        data = [],
        value = 0,
        label = '',
        link = '',
        formatHeading = data => data
    } = {}) {
        this.remove();

        this.data = data;
        this.label = label;
        this.link = link;
        this.value = formatHeading(value);

        this.render();
    }

    remove() {
        this.element.remove();    
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = {};
    }

    getLink() {
        if (this.link) {
            return `<a href="${this.link}" class="column-chart__link">View all</a>`;
        }
        return '';
    }

    getSubElements() {
        const result = {};
        const elements = this.element.querySelectorAll('[data-element]');

        for (const subElement of elements) {
            const name = subElement.dataset.element;

            result[name] = subElement;
        }
        
        return result;
    }

    getColumnBody() {
        const props = this.getColumnProps(this.data);

        return props.map(item => {
            return `<div style="--value: ${item.value}" data-tooltip="${item.percent}"></div>`
        }).join('');        
    }

    getColumnProps(data) {
        const maxValue = Math.max(...data);
        const scale = this.chartHeight / maxValue;
      
        return data.map(item => {
          return {
            percent: (item / maxValue * 100).toFixed(0) + '%',
            value: String(Math.floor(item * scale))
          };
        });
    }
}