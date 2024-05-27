import nodemailer from "nodemailer";
import { EnvConfig } from "../config/envConfig";

interface IProduct {
  name: string;
  amount: number;
  price: number;
  image: string;
}

export const sendEmailCreateOrder = async (email: string, orderItems: any) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EnvConfig.nodemailer.email,
      pass: EnvConfig.nodemailer.password,
    },
  });

  const now = new Date();
  const test = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  };

  const formatter = new Intl.DateTimeFormat("vi-VN", test as any);
  const formattedDate = formatter.format(now);

  let orderString = "";

  orderItems?.forEach((product: any) => {
    orderString += `<div>
            <div>_________________________________________________</div>
            <div>Bạn đã đã đặt sách :<b>${product.name} </div>
            <div>Có số lượng là : <b>${product.amount}</b><div>
            </div>  
                Giá là :<b>${Number(product.amount * product.price)}VND</b>
            </div>
            <div style="width: 100px; height: 100px;"><img style="width: 100%; height: 100%;" src="${
              product.image
            }" alt=""></div>
        </div>`;
  });

  let info = await transporter.sendMail({
    from: email, // sender address
    to: email, // list of receivers
    subject: `Đơn hàng đã đặt của website ThanhPhuongDev `, // Subject line
    text: `${JSON.stringify(orderItems)}`, // plain text body
    html: `<div><b>Bạn đã đặt hàng thành công tại website thanhphuong</b>
                <div>Tổng số đơn hàng đã đặt: <b>${orderItems?.length} </b> vào lúc <b> ${formattedDate} </b>
                 </div>
    </div> ${orderString}`,
  });
};
