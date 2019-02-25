import { html, LitElement, css } from 'lit-element';

class LitTable extends LitElement {
  static get properties() {
    return {
      tableData: Array,
      currentRender: Number,
    };
  }

  constructor() {
    super();

    this.currentRender = 20;
  }

  updated() {
    requestIdleCallback(() => {
      this.increaseRender();
      this.requestUpdate();
    });
  }

  increaseRender() {
    if (this.tableData.length > this.currentRender) {
      this.currentRender += 20;
    }
  }

  static get styles() {
    return window.location.search.match('noShadow')
      ? []
      : [
          css`
            th {
              color: blue;
              height: 80px;
              line-height: 80px;
              font-size: 20px;
            }
            tr:nth-child(even) {
              color: green;
              font-size: 1.3em;
            }
            tr:nth-child(odd) {
              color: yellow;
            }
          `,
        ];
  }

  sortColumn({ target }) {
    const columnIndex = parseInt(target.dataset.id);
    this.tableData = [
      ...this.tableData.sort((a, b) => {
        if (a[columnIndex] < b[columnIndex]) {
          return 1;
        } else if (a[columnIndex] > b[columnIndex]) {
          return -1;
        }
        return 0;
      }),
    ];
  }

  createRenderRoot() {
    if (window.location.search.match('noShadow')) return this;

    return super.createRenderRoot();
  }

  render() {
    const { tableData, currentRender } = this;
    return html`
      <table>
        <tr>
          ${tableData[0].map((data, columnIndex) => {
            return html`
              <th @click="${this.sortColumn}" data-id="${columnIndex}">Sort</th>
            `;
          })}
        </tr>
        ${tableData.slice(0, currentRender).map(data => {
          return html`
            <tr>
              ${data.map(entry => {
                return html`
                  <td>${entry}</td>
                `;
              })}
            </tr>
          `;
        })}
      </table>
    `;
  }
}

customElements.define('web-table', LitTable);
