import React from "react";
import "./Privacy.scss";

function Privacy() {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <header className="privacy-header">
          <h1>Chính sách bảo mật</h1>
          <p className="last-updated">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
        </header>

        <div className="privacy-content">
          <section>
            <h2>1. Thông tin chúng tôi thu thập</h2>
            <p>
              Chúng tôi có thể thu thập các loại thông tin sau:
            </p>
            <ul>
              <li>Thông tin cá nhân bạn cung cấp (tên, email, tin nhắn liên hệ)</li>
              <li>Thông tin kỹ thuật (địa chỉ IP, trình duyệt, hệ điều hành)</li>
              <li>Thông tin sử dụng website (trang xem, thời gian truy cập)</li>
            </ul>
          </section>

          <section>
            <h2>2. Cách chúng tôi sử dụng thông tin</h2>
            <p>
              Thông tin của bạn được sử dụng để:
            </p>
            <ul>
              <li>Phản hồi các yêu cầu liên hệ của bạn</li>
              <li>Cải thiện trải nghiệm website</li>
              <li>Gửi thông tin cập nhật (nếu bạn đăng ký)</li>
              <li>Phân tích và cải thiện dịch vụ</li>
            </ul>
          </section>

          <section>
            <h2>3. Chia sẻ thông tin</h2>
            <p>
              Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn 
              cho bên thứ ba, trừ khi:
            </p>
            <ul>
              <li>Có sự đồng ý của bạn</li>
              <li>Theo yêu cầu pháp lý</li>
              <li>Bảo vệ quyền lợi và an toàn của chúng tôi và người dùng khác</li>
            </ul>
          </section>

          <section>
            <h2>4. Bảo mật thông tin</h2>
            <p>
              Chúng tôi sử dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin 
              cá nhân của bạn khỏi truy cập, sử dụng hoặc tiết lộ trái phép.
            </p>
          </section>

          <section>
            <h2>5. Quyền của bạn</h2>
            <p>
              Bạn có quyền:
            </p>
            <ul>
              <li>Yêu cầu truy cập vào thông tin cá nhân của bạn</li>
              <li>Yêu cầu sửa chữa thông tin không chính xác</li>
              <li>Yêu cầu xóa thông tin cá nhân của bạn</li>
              <li>Rút lại sự đồng ý bất cứ lúc nào</li>
            </ul>
          </section>

          <section>
            <h2>6. Cookies</h2>
            <p>
              Website này sử dụng cookies để cải thiện trải nghiệm người dùng. 
              Bạn có thể tắt cookies trong trình duyệt, nhưng một số tính năng 
              có thể không hoạt động đúng cách.
            </p>
          </section>

          <section>
            <h2>7. Liên hệ</h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, 
              vui lòng liên hệ với chúng tôi qua:
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

export default Privacy;
