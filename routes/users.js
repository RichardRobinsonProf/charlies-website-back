var express = require("express");
var router = express.Router();
const data = require("../data/user");
const { transporter } = require("../data/mailer");

/* GET users listing. */

router.post ("/send-email", async (req, res) => {
    const { email,telephone, name, message } = req.body;
    console.log(email,telephone, name, message);
    res.send("ok");
})

router.post("/", async (req, res) => {
  const user = req.body;
  const result = await data.addUser(user);
  try {
    const similarUsers = await data.searchSimilarUsers(user);
    const listMoments = searchMoments(user, similarUsers);
    console.log(listMoments);
    listMoments.length > 0
      ? await transporter.sendMail({
          from: "Search Groups",
          to: "tom.maenhout@gmail.com",
          subject: `${user.firstName} ${user.lastName} found a group`,
          text: " ",
          html: `<div>
          <h1>${user.firstName} found a group <h1>
          <p>name: ${user.firstName} ${user.lastName}<p>
          <p>email: ${user.email}<p>
          <p>language: ${user.language}<p>
          <p>level: ${user.level}<p>
          <p>objective: ${user.objective}<p>
          <p>exam: ${user.exam}<p>
          <p>timezone value: ${user.timeZone.value}<p>
          <p>timezone: ${user.timeZone.label}<p>
          <p>timezone offset: ${user.timeZone.offset}<p>
          <h1>Group(s)<h1>
          ${listMoments.map(
            (group) => `
            <h1>group ${listMoments.indexOf(group) + 1}<h1>
            ${group.map(
              (moment) => `
              ${group.indexOf(moment) === 0 ? `<p>scheduled class: ${moment.timeUserCurrent.day} ${moment.timeUserCurrent.hour < 10 ? `0${moment.timeUserCurrent.hour}` : `${moment.timeUserCurrent.hour}`} : ${moment.timeUserCurrent.minute < 10 ? `0${moment.timeUserCurrent.minute}` : `${moment.timeUserCurrent.minute}`} Argentine time<p>` : `------------------`}
              <p>name: ${moment.similarUser.firstName} ${moment.similarUser.lastName}<p>
              <p>email: ${moment.similarUser.email}<p>
              <p>language: ${moment.similarUser.language}<p>
              <p>level: ${moment.similarUser.level}<p>
              <p>objective: ${moment.similarUser.objective}<p>
              <p>exam: ${moment.similarUser.exam}<p>
              <p>timezone value: ${moment.similarUser.timeZone.value}<p>
              <p>timezone: ${moment.similarUser.timeZone.label}<p>
              <p>timezone offset: ${moment.similarUser.timeZone.offset}<p>
              `
            )}
            <p>----------------------------------------------<p>
          `)}
          </div>`
        })
      : console.log("No groups");
    res.json(`${listMoments.length > 0 ? "ok" : "no groups"}`);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

function searchMoments(userCurrent, similarUsers) {
  let arrayMoments = [];
  userCurrent.argentineTime.forEach((time) => {
    let timeUserCurrent = time;
    similarUsers.forEach((similarUser) => {
      similarUser.argentineTime.forEach((timeSimilar) => {
        if (
          timeUserCurrent.day === timeSimilar.day &&
          timeUserCurrent.hour === timeSimilar.hour &&
          timeUserCurrent.minute === timeSimilar.minute
        ) {
          arrayMoments.push({ timeUserCurrent, timeSimilar, similarUser });
        }
      });
    });
  });

  console.log(arrayMoments);
  let listGroups = [];
  while (arrayMoments.length > 0) {
    let firstMoment = arrayMoments[0];
    let group = [];
    group = arrayMoments.filter(
      (moment) =>
        moment.timeUserCurrent.day === firstMoment.timeUserCurrent.day &&
        moment.timeUserCurrent.hour === firstMoment.timeUserCurrent.hour &&
        moment.timeUserCurrent.minute === firstMoment.timeUserCurrent.minute
    );
    console.log(
      "---------------------------------------------group after filter-----------"
    );
    console.log(group);
    arrayMoments = arrayMoments.filter(
      (moment) =>
        moment.timeUserCurrent.day !== firstMoment.timeUserCurrent.day ||
        moment.timeUserCurrent.hour !== firstMoment.timeUserCurrent.hour ||
        moment.timeUserCurrent.minute !== firstMoment.timeUserCurrent.minute
    );
    console.log(
      "---------------------------------------------arrayMoments after filter------------"
    );
    console.log(arrayMoments);
    listGroups.push(group);
  }
  return listGroups;
}

module.exports = router;
