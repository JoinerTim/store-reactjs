import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./confirmOrder.scss";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../../redux/toolkits/orderSlice";
import { deleteCartUser, getMyCarts } from "../../redux/toolkits/cartSlice";
import Loader from "../loader/Loader";

const ConfirmOrder = ({
  arrayId,
  isDisplay,
  provisional,
  moneyShip,
  setIsDisplay,
  isOne,
  product,
  products,
  quantity,
  productSelected,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.orderState);

  const history = useNavigate();
  if (!isOne) {
    var newArray = [];
    products?.forEach((item, i) => {
      if (item.selected) {
        newArray.push(item);
      }
    });
  }
  const confirmRef = useRef();
  const ovlRef = useRef();

  const [address, setAddress] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");

  const handleDisplay = () => {
    if (isDisplay) {
      confirmRef.current.classList.add("show");
      ovlRef.current.classList.add("show");
    }
  };
  handleDisplay();
  useEffect(() => {}, [isDisplay, refreshKey]);

  const handleClose = () => {
    confirmRef.current.classList.remove("show");
    ovlRef.current.classList.remove("show");
    setIsDisplay(!isDisplay);
  };

  if (isOne) {
    var provisional = ((product.price * (100 - product.sale)) / 100) * quantity;
    var sum =
      ((((product.price * (100 - product.sale)) / 100) * quantity +
        product.moneyShip) *
        110) /
      100;
  } else {
    sum = ((provisional + moneyShip) * 110) / 100;
  }

  const checkAllNotNull = () => {
    if (
      address !== "" && address.trim() !== "" && city !== "" && city.trim() !== "" &&
      phoneNo !== "" && phoneNo.trim() !== "" && country !== "" && country.trim() !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (
      isOne && checkAllNotNull()
    ) {
      const shippingInfo = { address:address.trim(), country: country.trim(), city: city.trim(), phoneNo };
      const orderItems = [
        {
          name: product.name,
          price: product.price,
          quantity,
          image: product.images[0].url,
          product: product._id,
        },
      ];
      try {
        await dispatch(
          createNewOrder({
            shippingInfo,
            orderItems,
            itemsPrice: provisional,
            taxPrice: 10,
            shippingPrice: product.moneyShip,
            totalPrice: sum,
          })
        )
          .unwrap()
          .then(() => {
            toast.success("S???n ph???m ???? ???????c ?????t h??ng");
            // handleDeleteCartItem(arrayId);
            handleClose();
            // setRefreshKey((oldv) => oldv + 1);
            // history("/myorder");
          });
      } catch {}
    } else if (
      checkAllNotNull()
    ) {
      const shippingInfo = { address:address.trim(), country: country.trim(), city: city.trim(), phoneNo };
      const orderItems = [];
      newArray.forEach((item, i) => {
        orderItems.push({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images[0].url,
          product: item.product._id,
        });
      });
      try {
        await dispatch(
          createNewOrder({
            shippingInfo,
            orderItems,
            itemsPrice: provisional,
            taxPrice: 10,
            shippingPrice: moneyShip,
            totalPrice: sum,
          })
        )
          .unwrap()
          .then(() => {
            toast.success("S???n ph???m ???? ???????c ?????t h??ng");
            handleDeleteCartItem(arrayId);
            handleClose();
            // setRefreshKey(old => old + 1)
            // history("/myorder");
          });
      } catch {}
    } else {
      toast.error("Vui l??ng nh???p ?????y ????? th??ng tin");
    }
  };

  const handleDeleteCartItem = async (arrayId) => {
    try {
      await dispatch(deleteCartUser({ newArrayId: arrayId })).unwrap();
      setRefreshKey((oldKey) => oldKey + 1);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    const getCartFake = async () => {
      try {
        await dispatch(getMyCarts()).unwrap();
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getCartFake();
  }, [refreshKey, dispatch]);
  return (
    <div className="confirm-order">
      <div ref={ovlRef} className="ovrly"></div>
      <form ref={confirmRef} onSubmit={handleCreateOrder} className="confirm">
        <div className="closed" onClick={handleClose}>
          <i className="fa-solid fa-square-xmark"></i>
        </div>
        <div className="form--left">
          <div className="heading-confirm">
            <h2>CHI TI???T ????N H??NG</h2>
          </div>
          <div className="form-group">
            <div className="form-group__align">
              <label htmlFor="address">?????a ch???:</label>
            </div>
            <input
              type="text"
              id="address"
              required
              placeholder="Nh???p ?????a ch???..."
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              tabIndex={1}
            />
          </div>
          <div className="form-group">
            <div className="form-group__align">
              <label htmlFor="city">Th??nh ph???:</label>
            </div>
            <input
              type="text"
              id="city"
              required
              placeholder="Nh???p th??nh ph???..."
              onChange={(e) => setCity(e.target.value)}
              value={city}
              tabIndex={2}
            />
          </div>
          <div className="form-group">
            <div className="form-group__align">
              <label htmlFor="country">Qu???c gia:</label>
            </div>
            <input
              type="text"
              id="country"
              required
              placeholder="Nh???p qu???c gia..."
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              tabIndex={3}
            />
          </div>
          <div className="form-group">
            <div className="form-group__align">
              <label htmlFor="phone">S??? ??i???n tho???i:</label>
            </div>
            <input
              type="number"
              id="phone"
              required
              placeholder="Nh???p s??? ??i???n tho???i..."
              onChange={(e) => setPhoneNo(e.target.value)}
              value={phoneNo}
              tabIndex={4}
            />
          </div>
        </div>
        <div className="form--right">
          <div className="heading-confirm">
            <h2>????N H??NG C???A B???N</h2>
          </div>
          <div className="all--product">
            <h3>S???n ph???m</h3>
            <ul>
              {isOne ? (
                <li>
                  {product.name} x {quantity}
                  <span>
                    {Math.floor((product.price * (100 - product.sale)) / 100)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    ??
                  </span>
                </li>
              ) : (
                newArray.map((item, i) => (
                  <li key={i}>
                    {item.product.name} x {item.quantity}
                    <span>
                      {Math.floor(
                        (item.product.price * (100 - item.product.sale)) / 100
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      ??
                    </span>
                  </li>
                ))
              )}
            </ul>
            <h3>Th??nh ti???n</h3>
            <ul>
              <li>
                T???m t??nh({isOne ? quantity : productSelected}s???n ph???m){" "}
                <span>
                  {isOne
                    ? Math.floor(provisional)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : Math.floor(provisional)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  ??
                </span>
              </li>
              <li>
                Ph?? giao h??ng{" "}
                <span>
                  {isOne
                    ? Math.floor(product.moneyShip)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : Math.floor(moneyShip)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  ??
                </span>
              </li>
              <li>
                Thu???(VAT) <span>10%</span>
              </li>
              <li>
                <h2>T???NG TI???N</h2>{" "}
                <span>
                  {Math.floor(sum)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  ??
                </span>
              </li>
            </ul>
            <div className="product--pay">
              <button className="btn primary-btn" onClick={handleCreateOrder}>
                THANH TO??N
              </button>
            </div>
          </div>
        </div>
      </form>
      {loading && <Loader />}
    </div>
  );
};

export default ConfirmOrder;
