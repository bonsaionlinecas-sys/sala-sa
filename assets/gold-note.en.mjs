const f=n=>Number(n).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:4});
export function goldNote(tool,v,r){
 switch(tool){
 case'invoice':return `Making charges: SAR ${f(v.weight*v.work)}. The hypothetical levy on the subtotal is SAR ${f(r.values[1]-(v.weight*v.price+v.weight*v.work))}. This calculation does not determine the legal tax treatment.`;
 case'karat':return `Nominal purity: ${f(v.karat/24*100)}%. The calculation starts from a 24K reference and excludes making charges and other fees.`;
 case'scrap':return `Total difference from the metal reference: SAR ${f(r.values[0]-r.values[1])}. The discount is the assumption you entered, not a fixed market rate.`;
 case'budget':return 'A theoretical fractional weight before costs you have not entered. Do not round the weight upwards when working within a fixed budget.';
 case'premium':return `Calculated fine-gold content: ${f(v.weight*v.purity/1000)} g. Offer minus the metal reference: SAR ${f(v.offer-r.values[0])}. The premium percentage uses the metal reference as its denominator.`;
 case'ounce':return 'Fixed mass conversion: 1 troy ounce = 31.1034768 grams. The result is a theoretical metal value before making charges or other costs.';
 case'compare':return r.values[0]===r.values[1]?'The two offers have the same total cost for these inputs.':`Offer ${r.values[0]<r.values[1]?'A':'B'} costs less in this model. Cost per gram: A SAR ${f(r.values[0]/v.weight)}, B SAR ${f(r.values[1]/v.weight)}. The calculation does not assess the quality of either piece.`;
 case'netweight':return 'The entered gram price must match the alloy’s own karat. Purity is not deducted from that value a second time. The result excludes the value of stones.';
 default:throw Error('Unsupported English gold tool');
 }
}
export function goldError(message){
 const errors={
  'أدخل أرقاماً موجبة واضحة دون فواصل آلاف أو رموز عملات.':'Enter clear positive numbers without thousands separators or currency symbols.',
  'القيمة غير صالحة.':'Enter a valid finite number.',
  'يجب أن تكون القيم أرقاماً غير سالبة.':'All values must be finite, non-negative numbers.',
  'الرسوم تتجاوز القيمة المتبقية بعد الخصم. راجع العرض والمدخلات.':'The fees exceed the value remaining after the discount. Check the offer and your inputs.',
  'يجب أن تتجاوز الميزانية الرسوم الثابتة حتى يبقى مبلغ لشراء الذهب.':'The budget must exceed the fixed fees so that an amount remains for gold.',
  'يجب أن يكون وزن الأجزاء غير الذهبية أقل من الوزن الإجمالي.':'The weight of non-gold parts must be less than the gross weight.'
 };return errors[message]||(!/[\u0600-\u06ff]/.test(message)?message:'Check the weight, price and permitted range of each input.');
}
