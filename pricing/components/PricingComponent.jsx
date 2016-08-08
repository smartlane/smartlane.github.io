import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-rangeslider';
import _ from 'underscore';

/*var packages = [
  { id: 1, tasks: 0, price: 100, name: 'Basic' },
  { id: 2, tasks: 500, price: 100, name: 'Starter' },
  { id: 3, tasks: 3000, price: 500, name: 'Standard'},
  { id: 4, tasks: 10000, price: 1500, name: 'Pro' },
  { id: 5, tasks: 25000, price: 3500, name: 'Enterprise'}
];*/

var packages = [
  { id: 1, tasks: 500, price: 100, name: 'Basic' },
  { id: 2, tasks: 3000, price: 500, name: 'Starter' },
  { id: 3, tasks: 10000, price: 1500, name: 'Standard'},
  { id: 4, tasks: 25000, price: 3500, name: 'Pro' },
  { id: 5, tasks: 30000, price: 3500, name: 'Enterprise'}
];

const PricingComponent = React.createClass({

  getInitialState: function() {
      return ({ value: 500, pricingpackage: packages[0], overheadprice: 0 });
  },

  getPricingPackage: function(value) {
    var idx = packages.length-1;
    while(idx>0) {
      if(value > packages[idx].tasks) {
        return packages[idx];
      }
      --idx;
    }
    return packages[0];
  },

  handleChange: function(value) {
    var pack = this.getPricingPackage(value);
    var overheadprice = 0;
    if(pack.tasks > 0) {
      //console.log(pack.price / pack.tasks);
      //console.log(value - pack.tasks);
      overheadprice = Math.ceil((value - pack.tasks) * (pack.price / pack.tasks));
    }

    this.setState({ pricingpackage: pack, value: value, overheadprice: overheadprice });
  },

	render: function() {

    var total = this.state.pricingpackage.price + this.state.overheadprice;

    var name = this.state.pricingpackage.name;

    var str;
    if(this.state.value > packages[3].tasks) {
      str = (<span>auf Anfrage</span>);
      name = packages[packages.length-1].name;
    }
    // apply better package if cheaper
    else if(total > packages[this.state.pricingpackage.id+1-1].price) {
      str = (<span>{packages[this.state.pricingpackage.id+1-1].price}&euro;</span>);
      name = packages[this.state.pricingpackage.id+1-1].name;
    }
    else {
      str = (<span>{total}&euro;</span>);
    }

		return (
      <div  style={{width: '500px', textAlign: 'center', border: '1px solid #C5C5C5', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px', padding: '30px', background: '#FFFFFF'}}>
        <h1>Preisrechner</h1>
        <Slider
          min={0}
          max={30000}
          step={250}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
        <thead></thead>
        <tbody>
          <tr><td style={{textAlign: 'right'}}>Aufträge pro Monat:</td><td style={{textAlign: 'left', paddingLeft: '20px'}}><span style={{color: '#e35d21', fontWeight: 'bold'}}>{this.state.value}</span></td></tr>
          <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
          <tr><td style={{textAlign: 'right'}}>Paket:</td><td style={{width: '150px', textAlign: 'left', paddingLeft: '20px'}}><span style={{color: '#e35d21', fontWeight: 'bold'}}>{name}</span></td></tr>
          <tr><td style={{textAlign: 'right'}}>Preis: </td><td style={{textAlign: 'left', paddingLeft: '20px'}}><span style={{color: '#e35d21', fontWeight: 'bold'}}>{str}</span></td></tr>
        </tbody>
        </table>
      </div>

    );

  }

});

export default PricingComponent;
