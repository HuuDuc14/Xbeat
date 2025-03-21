import { useContext, useEffect, useState } from "react";
import SectionsHead from "../../../components/common/SectionsHead";
import useDocTitle from "../../../hooks/useDocTitle";
import { ProductContext } from "../../../contexts/product/productContext";
import commonContext from "../../../contexts/common/commonContext";
import FormProduct from "../../../components/form/FormProduct";
import { Toast } from "../../../components/alert/toast";
import Swal from "sweetalert2";


const ManageProducts = () => {
    useDocTitle("Quản lý sản phẩm");

    const api_url = 'http://localhost:5000'
    const { products, deleteProduct } = useContext(ProductContext)
    const { toggleFormCreate } = useContext(commonContext);
    const [allProduct, setAllProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            try {
                setAllProducts(products)
            } catch (error) {
                console.log("Lỗi khi lấy sản phẩm: ", error);

            }
        }
        getProducts()
    }, [products])

    if (allProduct == null) {
        return (
            <>
                ...loading
            </>
        )
    }

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                text: "Bạn có chắc chắn xóa sản phẩm này không!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#FF0000",
                cancelButtonColor: "#454a4d",
                background: "#222",
                color: "#a9afc3",
                confirmButtonText: "Xóa"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await deleteProduct(id)
                    Toast.fire({
                        icon: "success",
                        title: `${response}`
                    });
                }
            });
            
        } catch (error) {
            Toast.fire({
                icon: "error",
                title: `Không xóa được sản phẩm`
            });
        }
    }


    return (
        <>
            <div className="section container">
                <SectionsHead heading="Quản lý sản phẩm" />
                <div>
                    <button className="btn" onClick={() => toggleFormCreate(true)}>Thêm sản phẩm</button>
                </div>
                <div className="table-wrapper">
                    <table className="table" cellPadding="5" cellSpacing="0">
                        <thead>
                            <tr>
                                <th style={{ width: "100px" }}>Hình ảnh</th>
                                <th>Hãng</th>
                                <th>Tên sản phẩm</th>
                                <th>Loại</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProduct.map((product) => (
                                <tr key={product._id}>
                                    <td><img src={`${api_url}/images/${product.images[0]}`} alt="product-img" /></td>
                                    <td>{product.brand}</td>
                                    <td>{product.title}</td>
                                    <td>{product.type}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.finalPrice}</td>
                                    <td>
                                        <button className="btn" onClick={() => handleDelete(product._id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <FormProduct />

        </>
    )
}

export default ManageProducts