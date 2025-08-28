import React from "react";
import "./Terms.scss";

function Terms() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <header className="terms-header">
          <h1>Điều khoản sử dụng</h1>
          <p className="last-updated">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
        </header>

        <div className="terms-content">
          <section>
            <h2>1. Chấp nhận điều khoản</h2>
            <p>
              Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân thủ và bị ràng buộc 
              bởi các điều khoản và điều kiện sau đây. Nếu bạn không đồng ý với bất kỳ phần 
              nào của các điều khoản này, bạn không được sử dụng website.
            </p>
          </section>

          <section>
            <h2>2. Mục đích sử dụng</h2>
            <p>
              Website này được tạo ra với mục đích:
            </p>
            <ul>
              <li>Giới thiệu thông tin cá nhân và nghề nghiệp</li>
              <li>Showcase các dự án và kỹ năng</li>
              <li>Chia sẻ kiến thức qua blog</li>
              <li>Tạo kênh liên hệ với các cơ hội hợp tác</li>
            </ul>
          </section>

          <section>
            <h2>3. Quyền sở hữu trí tuệ</h2>
            <p>
              Tất cả nội dung trên website này, bao gồm nhưng không giới hạn ở văn bản, 
              hình ảnh, đồ họa, logo, và mã nguồn, đều thuộc quyền sở hữu của chúng tôi 
              hoặc được cấp phép sử dụng hợp pháp.
            </p>
          </section>

          <section>
            <h2>4. Hành vi của người dùng</h2>
            <p>
              Khi sử dụng website, bạn đồng ý không:
            </p>
            <ul>
              <li>Sử dụng website cho mục đích bất hợp pháp</li>
              <li>Phá hoại hoặc gây tổn hại đến website</li>
              <li>Gửi spam hoặc nội dung độc hại</li>
              <li>Xâm phạm quyền riêng tư của người khác</li>
              <li>Sao chép nội dung mà không có sự cho phép</li>
            </ul>
          </section>

          <section>
            <h2>5. Liên kết bên ngoài</h2>
            <p>
              Website có thể chứa các liên kết đến website bên thứ ba. Chúng tôi không 
              chịu trách nhiệm về nội dung hoặc chính sách của các website này.
            </p>
          </section>

          <section>
            <h2>6. Giới hạn trách nhiệm</h2>
            <p>
              Thông tin trên website được cung cấp "như hiện tại" và chúng tôi không 
              đảm bảo tính chính xác hoặc đầy đủ của thông tin. Chúng tôi không chịu 
              trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng website.
            </p>
          </section>

          <section>
            <h2>7. Thay đổi điều khoản</h2>
            <p>
              Chúng tôi có quyền sửa đổi các điều khoản này bất kỳ lúc nào. Việc tiếp tục 
              sử dụng website sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các 
              điều khoản mới.
            </p>
          </section>

          <section>
            <h2>8. Luật áp dụng</h2>
            <p>
              Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp 
              sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
            </p>
          </section>

          <section>
            <h2>9. Thông tin liên hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên hệ:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:contact@nhdinh.dev">contact@nhdinh.dev</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;
