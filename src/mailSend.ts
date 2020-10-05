import nodeMail from "nodemailer";
import dayjs from "dayjs";

const transporter = nodeMail.createTransport({
  host: "smtp.office365.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.NODEMAIL_USER,
    pass: process.env.NODEMAIL_PASS,
  },
});

export const sendMail = (agent: string, text?: string, html?: string) =>
  transporter.sendMail({
    from: `${agent} <${process.env.NODEMAIL_USER}>`,
    to: process.env.RECEIVER_USER,
    subject: `${agent} ${dayjs().format("YYYY-MM-DD")}일자 신규 매물`,
    text,
    html,
  });

export const sendMailList = (agent: string, items: any[]) =>
  sendMail(
    agent,
    undefined,
    "<ul style='list-style:none'>" +
      items
        .map(
          (item) => `<li>
<a href="${item.url}">
<div style="display: flex">
    <div ><img src="${item.image}" height="150" width="150"></div>
    <div style="margin-left: 15px; margin-top: 20px; line-height: 184%">
        <b>${item.title}</b><br/>
        <b> 전세 비용: </b>${item.price_title} <b> 생활비용: </b>${item.month_total_cost_str}<br/>
        <b> 주소: </b>${item.address}<br/>
        <b> 승인날짜: </b>${item.approval_date}<br/> <b> 방크기: </b>${item.size}평<br/>
    </div>
</div>
</a>
<pre>${item.memo}</pre><br/>
</li>`
        )
        .join("<hr/>") +
      "</ul>"
  );
