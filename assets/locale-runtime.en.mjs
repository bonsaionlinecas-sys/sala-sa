export const prayerNames={fajr:'Fajr',sunrise:'Sunrise',dhuhr:'Dhuhr',asr:'Asr',maghrib:'Maghrib',isha:'Isha'};
export const dateLabel=iso=>new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Riyadh',day:'numeric',month:'long',year:'numeric'}).format(new Date(iso+'T12:00:00Z'));
export function prayerError(message){
 const errors={
  'اختر تاريخاً صحيحاً.':'Choose a valid date.',
  'التاريخ المتاح بين ٢٠٢٠ و٢٠٣٥.':'Choose a date between 2020 and 2035.',
  'اختر مدينة من القائمة.':'Choose a city from the list.',
  'تعذّر حساب الأوقات لهذه المدخلات.':'The times could not be calculated for these inputs.'
 };return errors[message]||(!/[\u0600-\u06ff]/.test(message)?message:'Check the city, date and calculation settings.');
}
