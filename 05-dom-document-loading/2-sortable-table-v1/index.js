export default class SortableTable {
  constructor(headerConfig = [], data = []) {
      this.data = data;
      this.headerConfig = headerConfig;

      this.render();
  }

  getTemplate() {
    return `
        <div class="sortable-table">
          ${this.getTableHeaders()}
          ${this.getTableBody()}
        </div>
    `
  }

  getTableHeaders() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.getHeaders()}
      </div>
    `;
  }

  getHeaders() {
    return this.headerConfig.map(item => {
      return `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
        <span>${item.title}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      </div>
      `
    }).join('');
  }

  getTableBody() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getTableRows(this.data)}
      </div>
    `;
  }

  getTableRows(data) {
    return data.map(item => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this.getRow(item)}
        </a>
      `
    }).join('');
  }

  getRow(rowData) {
    return this.headerConfig.map(item => {
      if (item.template) {
        return item.template(rowData);
      }
      return `
        <div class="sortable-table__cell">${rowData[item.id]}</div>
      `
    }).join('')
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.getTemplate();

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  sort(field, order) {
    const sortData = this.sortData(field, order);
    const column = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');

    allColumns.forEach(item => item.dataset.order = '');

    column.dataset.order = order;

    this.subElements.body.innerHTML = this.getTableRows(sortData);
  }

  sortData(field, order) {
    const direction = {
      'asc': 1,
      'desc': -1
    }

    const header = this.headerConfig.find((item) => item.id === field);

    return this.data.sort( (a, b) => {
      switch (header.sortType) {
        case 'number':
          return direction[order] * (a[header.id] - b[header.id]);
        case 'string':
          const collator = new Intl.Collator(['ru-RU', 'en-US'], {caseFirst: "upper"});
          return direction[order] * collator.compare(a[header.id], b[header.id]);
        default:
          return direction[order] * (a[header.id] - b[header.id]);
      }
    });
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }
  
    console.log(result);
    return result;
  }

  destroy() {
    this.element = null;
    this.data = null;
    this.headerConfig = null;
  }

}

