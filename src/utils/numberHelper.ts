const formatCurrency = (value: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    value
  );
};

export default {
  formatCurrency: formatCurrency,
};
