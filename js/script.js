$(document).ready(function() {
    let index = 2;

    // Hiển thị modal khi nhấn nút Đăng ký
    $("#btnRegister").click(function() {
        $("#paymentModal").modal('show');
    });

    // Reset modal khi nhấn nút Hủy
    $(".btn-danger").click(function() {
        $("#paymentForm")[0].reset();
        $("#errorStudentID").text("");
        $("#errorFullName").text("");
        $("#errorEmail").text("");
    });

    // Cập nhật tiền dịch vụ khi thay đổi loại dịch vụ
    $("#selectService").change(function() {
        $("#inputServiceValue").val($(this).val());
        updateTotal();
    });

    // Tính toán tiền đồ dùng khi chọn thêm các mục đồ dùng
    $(".checkboxEquipment").change(function() {
        let equipmentCost = 0;
        $(".checkboxEquipment:checked").each(function() {
            equipmentCost += parseFloat($(this).val());
        });
        $("#inputEquipmentValue").val(equipmentCost);
        updateTotal();
    });

    // Cập nhật tổng tiền
    function updateTotal() {
        const serviceCost = parseFloat($("#inputServiceValue").val()) || 0;
        const equipmentCost = parseFloat($("#inputEquipmentValue").val()) || 0;
        $("#inputTotalValue").val(serviceCost + equipmentCost);
    }

    // Thêm dòng dữ liệu vào bảng khi nhấn nút Thanh toán
    $("#btnPay").click(function() {
        const studentID = $("#inputStudentID").val().trim();
        const fullName = $("#inputFullName").val().trim();
        const email = $("#inputEmail").val().trim();
        const servicePrice = $("#inputServiceValue").val().trim();
        const equipmentPrice = $("#inputEquipmentValue").val().trim();
        const totalPrice = $("#inputTotalValue").val().trim();

        // Kiểm tra tính hợp lệ của dữ liệu
        let isValid = true;
        if (!/^\d{9}$/.test(studentID)) {
            $("#errorStudentID").text("Mã học viên không hợp lệ");
            isValid = false;
        }
        if (fullName === "") {
            $("#errorFullName").text("Họ tên không được để trống");
            isValid = false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            $("#errorEmail").text("Email không hợp lệ");
            isValid = false;
        }

        // Nếu hợp lệ, thêm dòng vào bảng
        if (isValid) {
            const newRow = `<tr>
                                <td>${index++}</td>
                                <td>${studentID}</td>
                                <td>${fullName}</td>
                                <td>${email}</td>
                                <td>${servicePrice}</td>
                                <td>${equipmentPrice}</td>
                                <td>${totalPrice}</td>
                            </tr>`;
            $("#tableStudentList tbody").append(newRow);
            $("#paymentModal").modal("hide");
        }
    });
});
