import { html, PolymerElement } from '@polymer/polymer';
import '@polymer/polymer/lib/elements/dom-repeat.js';

class PolymerTable extends PolymerElement {
  static get properties() {
    return {
      tableData: {
        type: Array,
      },
    };
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

  _attachDom(dom) {
    if (window.location.search.match('noShadow')) return this.appendChild(dom);

    super._attachDom(dom);
  }

  static get getStyle() {
    return window.location.search.match('noShadow')
      ? html``
      : html`
          <style>
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
          </style>
        `;
  }

  static get template() {
    return html`
      ${this.getStyle}
      <table>
        <tr>
          <dom-repeat items="[[tableData.0]]">
            <template>
              <th on-click="sortColumn" data-id="1">Sort</th>
            </template>
          </dom-repeat>
        </tr>
        <dom-repeat items="[[tableData]]">
          <template>
            <tr>
              <dom-repeat items="[[item]]" as="entry">
                <template>
                  <td>[[entry]]</td>
                </template>
              </dom-repeat>
            </tr>
          </template>
        </dom-repeat>
      </table>
    `;
  }
}

customElements.define('web-table', PolymerTable);
