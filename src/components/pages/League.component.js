import {Component} from '../../../lib/vues6.js'
import {GridCellRenderType} from '../Grid.component.js'

const template = `
<div class="page-league">
  <div class="header">
    League Standings
  </div>
    <app-grid
        :column_defs="column_defs"
        :data="data"
        :show_row_numbers="false"
    ></app-grid>
</div>
`

/**
 * Component representing the league standings page.
 * @extends Component
 */
class LeagueComponent extends Component {
    static get selector() { return 'page-league' }
    static get template() { return template }
    static get props() { return [] }

    GridCellRenderType = GridCellRenderType

    /**
     * Column definitions for the league standings grid.
     * @type {object[]}
     */
    column_defs = [
        {
            header: 'Standing',
            type: GridCellRenderType.HTML,
            key: 'standing',
            renderer: (value, row) => {
                return `
                    <h1 id="ranking">
                    Rank: ${row.standing.rank}
                    </h1>
                    <h2 id="record">
                        W/L: ${row.standing.win_loss}
                    </h2>
                `

            }
        },
        {
            header: 'Team',
            type: GridCellRenderType.HTML,
            key: 'team_name',
            renderer: (value, row) => {
                return `
                    <div class="center">
                        <img src="${row.team_image}" alt="${row.team_image}">
                        <span>${row.team_name}</span>
                    </div>
                `
            },
        },
        {
            header: 'Stats',
            key: 'stats',
        },
        {
            header: '',
            key: 'team_name',
            type: GridCellRenderType.Component,
            component: Vue.component('app-action-button'),
            button_color: '#CC5746',
            button_text: 'Test Action',
            on_click: (row, col) => {
                console.log('button clicked!')
            },
        }
    ]

    /**
     * Sample data for the league standings grid.
     * @type {object[]}
     */
    data = [
        {
            standing: {
                rank: 1,
                win_loss: '3/0',
            },
            team_name: 'Team 1',
            team_image: 'data:image/png;base64,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',
            stats: [
                { name: 'Total Points Scored', value: 1 },
                { name: 'Total Points Scored Against', value: 2 },
            ],
        },
        {
            standing: {
                rank: 2,
                win_loss: '3/0',
            },
            team_name: 'Team B',
            team_image: 'data:image/jpeg;base64,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',
            stats: [
                { name: 'Total Points Scored', value: 1 },
                { name: 'Total Points Scored Against', value: 2 },
            ],
        },
        {
            standing: {
                rank: 3,
                win_loss: '2/1',
            },
            team_name: 'Team C',
            team_image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQoAAAC+CAMAAAD6ObEsAAAAmVBMVEX///8AdraosLUAb7MAdLUAcbQAbbIAcLMAa7EAabCwt7yrs7jx8vP6+vrc3+GxuL28wsbS1tnGy87q7O3i5Oa3vsLN0dTJztEOe7na6fMAZq/f4uTo6uvw9/ulxt9IkcNZmsjN4O7l8Pe61OeYvtumx+CwzeM2iL9yp89/r9O20uZkoMuLtdYngrybwNzr9frD3u1NmchBjcGVhWqcAAALNUlEQVR4nO2cC3eiPBCGQxIQCHdFQUUELZd66/b//7hvBm2r1ku7p9+KNs/ZPd1tS0uGzMw7kwRCJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJH+PdesbaA9icOs7aAs2FWbv1jfRDmzaD2hg3/o2bk7XD0I6Io4Q/q1v5abYvktF6Hld+KdHTf8XzwzHNMPt8GtCxiEVQe+XWsO2x6HpWpv5+qVaZeAsgQBrjH6dNbr9UFAqhAvJY2Fwri9i+GwPrdG/9b39U3ohpWHgO45DSL585YqiqCwtEvySR8NfNDGC/Rj5nKpKA2dq+rSBEEK9W97cv8QOKerLbF4tFtOqXi92pgBjcMamOenTX5JMbJeCW0wivaM2dN4t0aAqxIJk8itkRkh7JC815RwM4ufY+wVOAlrKJ0n9h581BecVGAOc5Na3+r9ijwcCh5hX0XlTKFzVpgnxxK3v9v/D9iCDugOLJJWmXrBE4yRTMqKhc+tb/t8wRRcSQ7JWO5ftwMFOWg6ynJqPagwH4uUs4uzKjFDK6UpXU7zApe741nf9/2CC+z+xK4ZQynVCskhVlqA9fUEfUoZbNCD51TmhKB329AIGY6xOUGJ4Dyi3AmqTlXHVEqjAV82HjvqEV7mPZwtQTdlkdn1WoBV2H7SpTfrCfbSeeJc2+SDaGzDvMHaku48wFoS4D6e2ehSzwexDcUPpNS9m80rRzs6UTg3Fm+je+tZ/mgBNUehvo1RXzyAyNhsIBFmqn7YEVxPbFY/mHmCJgJDqfcx88VyXXO0wNaoykilHbsKZZhhcXYAYGd36zn8aHy0x3atHI6Zy1JVcUfWoSF4PbMHSIksSrsfENW995z9Nl4aEpJ/klap2OmARRVvNXvcCBntqLtLmEGAeLWQSV9ikOrKEakSL5XxeTyN0iD/7k2KG1+RPxDZdyw/81sdNu+v4ztdiGj7c2WFsVLU6JmQDGaRarPi7lNgmjiVcA38t18S+OKWB88VfdAtsx6MN4Vce2QCE5kGLQjWqDeSTUgNdgR5yFDSVLH79QyzPFQJ+vh3gL3JbusYMdVLojy3bglL6aoi3SRiS2ZDvGyIHQ+wEBeQR9aiBwTXGoU6HeYGrAxBqrK5vYuBtHT24LZiwmxiXcTx6be52qRmSOJ/uBs40NESeatv/RYt6Xlel/laoMVXD1g7MjMk6g6vrYbr9MUELq9SAejj6ZLbk2prY4lpH1hKuCx9SyJuawacFNnDqZkbw1+XzrCiKDLzluWyCCZuA5qpxljDG9KiOGNiLq8ocjC5aVpjZIe4MsWujw9OiHM4gEFwLFwLFQc2UqH7BBbBkttCaThYvS4VpMGRNi5Y2mcA8UavmiuQtsmzlBubbdCfd24MdUuEGjk2eNSinIv5KxvTaTpEAfGiFsULlUVpG4ADHAgPnQEaWHcVAnyDZ5zawugTl2bqsamH28Mm8mdBGApGeiovPa4zLYXHKdw/4NFy1k6HxCtMmX+ifv0lNWqo8Ib85pDLwQa9AD/UEvdiRNSGZFudXgbZoT2SJ8bQ6NWk4eKIb/qvhfQ8sNGeRYaSakeboNhdyah8MlV3tXzGIjORlanwYgrO35jjnzxCf25hNkRCDWJ6QvNT1Ca6Ens2pI1AEyfmmxLspsrg+6F2wdLYcdjoaxBatwjZn60LFGyEdWKC+ITfoRg0Z8+z0xQRSfqGRxw89o7OAa+PlsoiLxQIixWUfvC39Rnl7mCeNGZThZ251QHtkfS1QnDBMBF7Y3ftlLbYEFiJ9P8Dye8W5TUz35DdZYKzkTJvqEnqGtg4HQSgGjnMXS+vYlCk0iHn+aQWEwnxxsZd7Em0Jgt3zQ0rNpvC7i74FCigoGSBanIjwkFr8L2SPT6gpsU3zTblZ7S3RD7CgTKo7MJ9PSKCugEBBVl9a/DiwxMqGkqOlZfkFPJfEWmcJrn308CyfCoskq2+7B1oCHO7+Fo8dMEHES/DtfYe2fJfiIl98Vmqfhb0Ssk5QwwatlRKnwXWvharnJNzzkADs0IeBzL4fJ7QpIcuhEhN7QKkY3JOboCKeMLWGKvqtuWJtmztkU1+wBG/49FnQa7hgwvU1pmtIIfcUMzBY6JxtiLdzEUtgqRrPS+NcmOAKX6XTRVoqus7223lcL94WTLRVgT+s51J/dC8b4X0MFpj/QIxjg6srRJdsSuP8Zgq++lPP55MZdgRBV2vv6wIsiklS7qowzlg1SyCrNl3vuzAGptM5U7QaVTYN+wLyRna5/uJcVVXGNKOcY2NrJ8y5UUF02bMgV7XhmnR73XFAzbsQF9h1jLiiw0CsvokZdPZFqc113nhBDJ6k6quM2AvjuPsdN7+jR08L+5aBbSqIFgorsR8H2nBmfC2DMj6B7/fAn7KhNn0h5En7tH+Pa4uUv+Z7QbnVNI0cGD43yjU8xOxER+5ofBxXAaJJ0xATJgSb7bPPKhXD6NHE4IraiUnQyobeMc02iDiC+MCZrq8uqaomXXBllVa4zGFD9elZtnCbxInHyEg8qUquMe0gsSjqK0yLu4gWFiYN3M/fZM+zrVzGVvWfCPLkZnsVGgKH79DQxENDNPR3w82zpynbW3Bm6b2YAguvAe6gqZRTXdqm0Q1hcZLNI/wyK8io7wkwxK7M8AJ/1CW2jwYJ/F7XwtRpr9+DL1u2cEnoHLZHaR8fW15/tgVLFx19GieV3mlmDBRvnhDvU2APywmaxXOwiANaS9/qUTacQDy6i55FQ3MiDEa3PDYFN9br4XRD6nfxqc1IeD432t2R48Oc8aAWiZjaUfVikpCrC5KtAs9Hjkh6FCq4nk2guJrrHybSNza9eip/sPuWfLFs/nd3VWp3f2vmdtxZUZGXaC8GQkXf+8J+s4C6GDaaf7ZzT8ElRtvu3oElimRGDjXk8AUqty/EQMdteuqO797h6RAHRnioKtQFTPFoT0NyTXlu9r5/Bas3Goj2brm5hE/t5HALDYcMu1dgMZY+Yz/jG4nRvpcu7yEDSjYHCUQrQIZ/GCKabLYS885i4F8QUJIfbkokJHpbGuM6poJRIIR3l8/5e3gmifcXBTXcjbpkuyABpWdfCGE+4nGXT7je/uZ+nBRW3yZV4zNGRizcfoh7EB9u5/YnbNEn871soRcQPZztp3Bjat8boGt0W70s/jPgqcG9k8V8RWyUz43oQvdA4iIm9ncyyF0CIyT7uVR/afotu9VjXX2ti6fUYMM5Gd9RbfU3NNuQ1h8JRF+AlBp/bK7AzlUjMYbxnRVX38V2wRKbd62pYgc8FGTzqeOLnVvzoU3hQaDYvK2aq1q1IbYnQpINGW7MxRYd306NV/KIBz32wNXjeFeKcTQEGZkCD4LM5uun5yzP8wn4R1Qq6hrC6120bP8WrMS2luB6GjedHHdsHbzEJ1nPE2LDn8c7O3oA7jsuty5QNIZoXjTgQJEdeF7omru3tvS6Vi9s2W7tnwbrbjxMzlfNXue3Ny5YA9d03dALfHwf2rZxKR5dYAVQoOMe/Rimwsn39vQ80/Ucxxk/uLza7r4BUxgwP8KHDgXX8bcdLDTFI2fKr+BvHcTI7d/2IrxP+NsOFsSKnnd3/emfpb/tYLFngo29x06XVxiYJMfKiynTFh/e+CdAPb7raw5fHrzyvAb2NZsqlJf5b58VguQGvigyQo3x6ILyIj4UIXOlLGo8J9PSI2//CFtAFdpoakv8ppfKnqJHXac7HgwC8XgvqPkuY1z5xiWfX28JYDzqWfYvdw6JRCKRSCQSiUQikUgkEolEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJJKf4T+w6qznYKiB4AAAAABJRU5ErkJggg==',
            stats: [
                { name: 'Total Points Scored', value: 1 },
                { name: 'Total Points Scored Against', value: 2 },

            ],
        },
        {
            standing: {
                rank: 4,
                win_loss: '2/1',
            },
            team_name: 'Team D',
            team_image: 'data:image/png;base64,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',
            stats: [
                { name: 'Total Points Scored', value: 1 },
                { name: 'Total Points Scored Against', value: 2 },

            ],
        },
        {
            standing: {
                rank: 5,
                win_loss: '1/2',
            },
            team_name: 'Team E',
            team_image: 'data:image/png;base64,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',
            stats: [
                { name: 'Total Points Scored', value: 1 },
                { name: 'Total Points Scored Against', value: 2 },

            ],
        },
        {
            standing: {
                rank: 6,
                win_loss: '0/3',
            },
            team_name: 'Team F',
            team_image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhUIBwgWEhAVGCEbGBUYGBsbIBkgGCIiIRsbIBkZKDQnJyYmIRwXIT0iKC0rLi4yJyY/ODM4NygtLi0BCgoKDg0OGhAQGjEmICU3LzczKzYrMjcrNy03LSsrNy02LjMrLS0uNzYuMDcwKzctLS8tKy8vNy03KzErLTcrNf/AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEBAAMBAQAAAAAAAAAAAAAABgMFBwIE/8QAPxAAAgEDAgMFBAUKBgMAAAAAAAECAwQRBQYSITEHEyJBgSNRYXEUMpGT0hUXM0JSVWJygpJjobG0weEWRVb/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQQDBQL/xAAjEQEBAAICAQMFAQAAAAAAAAAAAQIRA0EhcaHREjGB8PEE/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8+oXcLGyldVfqwWWfQQ3a3f1aO2nZWqcqtZqnGMerdR8KS+eZfYPv4FtQqxrUVVh0kk16nsmOzvVXqu2KVSo/Gori+D6S+yaqR9CnHqUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgNQS1jtEp05PNK0jKrL5tOnTX+4l6L1uL2v9GtZVfNLkve/Jerwjl1tqf5M2ZfbrjLx3M3Gi37o+yov5cSdT5SYk3dT934+V+02322E9I3ldaX0hUl39P+Wvni+yrTqcv8RF0c2vL1X1HTt1Wnh4/ZTXku+4eFN/w16dGPqzotCrGvQjVpvlJJr1IVkABUAAAAAAAAAAAAAAAAAAAAAAAAAABrNX1mjpFKVxexcaUVl1ObS9+eFNrHvZoX2lbXX/ALal6ya/1iV84RnHhksog9Y2XdaZfy1jZtSNGrL9JQl+irY580vqy5vEl59V4pN2Sdj7Pzl7Y/e1H7z/AKMFXtW2nS5T1ann4d7L/OMGZ9K3KtUpyso0I2+owjl21bw59zUknmDf68VJYafXwkfrfaZruhXv0TVdrQpz8s1cqSXnGShhr5dPPmXDG5XUnvDKyTb6d4dpmkalos7LQ9QjUuJrhhCMaqblPwxw6kIrk5cXXOUif7WakNI0mx2pazXDRpqc/i0uCD9fav7DK+2a9/cVL7x/hITc+uV9x63PVLmCjKePCnlRUUkkn6Z+bZq4eHKZy2a/LPy8suOpV32czlr+x73bLm+8gu8ovpwuXijhr9mpFyf8yK3RO07QaOj0p6hqVKE5RUpR4pNxlLnKLjCDxiTklnHLBx3aG4q+19ZWpW9FVPDKDg3jiUscs4fmovp5Fr+eOt/81S+9f4CcvBlc7ZPHqvHy4/TN10Ol2l7Umuet0F/VP/mCMv5xtqfv2h/e/wAJFaD2j6xr979F0naMKkljiarYUE/OUnDC8/i8PCZZanr9DTcWStY3F/KPFG2pYz85TlhRhn9eeF7svkZssbjdWe8d5ZZuMi7RNqtctcoek3+E3el6xaarSVWxm5wksqSjJRafRqUkk0/gS+l7PuNSv46tu2cKtSLzSoRXsqOcdE+cpcl45e7kuSatoQjTjwxRLroegAQAAAAAAAAAAAAAAAAAAAAAAAAaPcW2bHXKK76DjVg806sXwzpy/ahNc0/tT80yP1mSp2S0jtBoRq2zaUL2K4eGT5RdSK/Ry6rjTcH05c0dMJXtGvlYbZqTp01KpKLjCLWeKU1wRWH1zOcOQiuK722HebZgr23rqvZyfKqsJxz9VSXxWPEuT9y5JyB0/tYUdE27YbZt5eGEOKTz1cFwxfq5TfzOa2ttXvLmNtaUZTqTeIxistv4JfaenwZ3LDeVYObGTPWLEWmytg1twWn5V1K6VtYrPtMrimotqXDnlFJpril7uj6kbUhOlUdOrBxknhxaw011TT5p/A6d2dU//Jth3216nOUcTpfBzzKP2VIOT+Y/0ZXHDeN/hw4y5aqt0SU7uy/JexrZW1kuX0uUeJ1PKTpQl9Z55d7Pw8uSlyK7QNu2Oh0HC1p5lJ8U5yblKcv2pzfOT+L6eSS5Hw9nmqw1ra9K9UUpyXjSWMSj4ZJLySkpJLySRTHmXe7tuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAitxyjqm7rXTM5jCTrSXwoLk/vKlL+xllXqKlRdSXRJt+hBbeuKMtXvtfv68adOni3U5PCXd5nWeX5d5UlH+klWILcWk6pv/f1daZT9hRkqLrSzwU1T+ss+b43N8K96zhPJVaZb2O2VLRtmWSur/pWuZp8FN+6pNefuow8XJ8s83sLRXu5beNpoFOVlpmH7TDhVrJvrDP1IS5vvJeOWeS6sstE0Wx0WxjaWFBQhBYSXl7+vPn5t5b82zplyWyY9Tr5fEwku+3OdXsNL3hL8nbis/oGq4ap1OWKvD5wnyVSP8LxKPPpzZObO07Vdib/AKVvq1LFK4zRVRP2c+LnDD9/FGK4Xh835c32fXNDsdasna31BSi+fnya6STXNNeUlhok7j6btyg7XcMJXtgsONbh46tLheVKpFLxqLw+9iuJNZcf1hjyWY3Hq9fBcJbMu31bQ4dL3JeaPnEe972C/huFxcvgqkbheqLUg9VuaFHX7PXbKvGdKtH6O5RaalxeOg8rljjg4Z/xC6hJTgpLoznK+69AAqAAAAAAAAAAAAAAAAAAAAAAAAAAA1W5rqdppE50qbnPDxBJtyaTlw4Xvxw+pD7K2Rf1dPpT3Tcd4oOU40PDwKc5ObnPHKpPMnzeYR8s9TpFa3pV2nVhnHT1MqWBLfKvFKlClHhgsHsAIHipTjUjwyR7AHOd57IvfoNWW17zueOUajovHd8cJKanFY9nLiSblHwy/WSy5FtodzK602E6lNwlhZi+scpPhfxSaRsDHSo06Oe6glnrgeRkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=',
            stats: [
                { name: 'Total Points Scored', value: 1 },
                { name: 'Total Points Scored Against', value: 2 },

            ],
        },
    ]

    /**
     * Called when the component is instantiated.
     * @return {Promise<void>}
     */
    async vue_on_create() {

    }
}

export default LeagueComponent
