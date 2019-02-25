import { html, LitElement, css } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import {guard} from 'lit-html/directives/guard';

class LitTable extends LitElement {
  static get properties() {
    return {
      tableData: Array,
      currentRenderItems: Number,
    };
  }

  constructor() {
    super();

    this.currentRenderItems = 50;
  }

  firstUpdated() {
    this.increaseRenderOnIdle();
  }

  increaseRenderOnIdle() {
    if (this.tableData.length > this.currentRenderItems) {
      requestIdleCallback(() => {
        this.currentRenderItems += 50;
        this.requestUpdate();
        this.increaseRenderOnIdle();
      });
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
    this.tableData.sort((a, b) => {
      if (a[columnIndex] < b[columnIndex]) {
        return 1;
      } else if (a[columnIndex] > b[columnIndex]) {
        return -1;
      }
      return 0;
    });

    this.currentRenderItems = 50;
    this.increaseRenderOnIdle();
  }

  createRenderRoot() {
    if (window.location.search.match('noShadow')) return this;

    return super.createRenderRoot();
  }

  render() {
    const { tableData, currentRenderItems } = this;
    return html`
      <table>
        <tr>
          ${tableData[0].map((data, columnIndex) => {
            return html`
              <th @click="${this.sortColumn}" data-id="${columnIndex}">Sort</th>
            `;
          })}
        </tr>
      </table>

      <table>
        ${repeat(
          tableData.slice(0, currentRenderItems),
          (i, j) => j,
          data => {
            return html`
              <tr>
                ${guard([data], () =>
                  data.map(
                    entry =>
                      html`
                        <td>${entry}</td>
                      `
                  )
                )}
              </tr>
            `;
          }
        )}
      </table>
    `;
  }
}

customElements.define('web-table', LitTable);
