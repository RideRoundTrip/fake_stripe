class Element {
  constructor(type) {
    this.type = type;
  }

  mount(el) {
    if (typeof el === "string") {
      el = document.querySelector(el);
    }

    switch (this.type) {
      case 'cardNumber':
        el.innerHTML = `<input id="stripe-cardnumber" placeholder="cardnumber" size="16" type="text">`;
        break;
      case 'cardExpiry':
        el.innerHTML = `<input placeholder="exp-date" size="6" type="text">`;
        break;
      case 'cardCvc':
        el.innerHTML = `<input placeholder="cvc" size="3" type="text">`;
        break;
    }
  }
}

window.Stripe = () => {
  const fetchLastFour = () => {
    return document.getElementById("stripe-cardnumber").value.substr(-4, 4);
  };

  return {
    elements: () => {
      return {
        create: (type, options) => new Element(type)
      };
    },

    createToken: card => {
      return new Promise(resolve => {
        resolve({ token: { id: "tok_123", card: { last4: fetchLastFour() } } });
      });
    }
  };
};
