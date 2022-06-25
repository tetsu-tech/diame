const webhook_url = process.env.REACT_APP_WEBHOOK_URL;

export const slackNotifier = (text, cause) => {
  const data = {
    text: `${text} \n cause: ${cause ?? "unknown reason"}`,
  };
  const xml = new XMLHttpRequest();
  xml.open("POST", webhook_url, false);
  xml.setRequestHeader(
    "content-type",
    "application/x-www-form-urlencoded;charset=UTF-8"
  );
  console.log(process.env);
  try {
    xml.send(`payload=${JSON.stringify(data)}`);
  } catch (e) {
    console.loog("url", process.env);
    console.log(e);
  }
};
