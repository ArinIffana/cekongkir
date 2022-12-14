import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Header from "../../components/Header";
import axios2 from "../../utils/axios2";
import { Link } from "react-scroll";

export default function Landing() {
  document.title = "CekOngkir";
  const [cityData, setCityData] = useState([]);
  const [form, setForm] = useState({});
  const [costData, setCostData] = useState([]);

  useEffect(() => {
    if (cityData.length === 0) {
      getDataCity();
    }
  }, []);

  const getDataCity = async () => {
    try {
      const result = await axios2.get("kota");
      setCityData(result.data.rajaongkir.results);
    } catch (error) {
      alert(`${error}`);
      console.log(error);
      console.log(error.response);
    }
  };

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.value, e.target.name);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const idOrigin = cityData.find((i) => i.city_name === form.origin);
      const idDestination = cityData.find(
        (i) => i.city_name === form.destination
      );
      console.log(idOrigin, idDestination);
      const result = await axios2.get(
        `ongkos/${idOrigin.city_id}/${idDestination.city_id}/${form.weight}/${form.courier}`
      );
      console.log(result.data.rajaongkir.results[0].costs);
      setCostData(result.data.rajaongkir.results[0].costs);
    } catch (error) {
      console.log(error);
    }
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  return (
    <div className={styles.landing__body}>
      <Header />
      <main className={styles.landing__main} id="home">
        <div>
          <h1>
            Cek Ongkir <br />
            dengan Mudah
          </h1>
          <h2>CekOngkir dapat memastikan harga ongkir secara akurat.</h2>
          <br />
          <button>
            <Link
              activeClass="active"
              to="service"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Mulai
            </Link>
          </button>
        </div>
        <img src="image/Delivery2.png" alt="" />
      </main>
      <section className={styles.landing__section} id="service">
        <div className={styles.landing__section__left}>
          <h3>Cek Ongkir</h3>
          <form onSubmit={handleSubmit}>
            <div className={`mb-3`}>
              <label for="exampleInputFirstName1" className={`form-label`}>
                Kota Asal :
              </label>
              <br />
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
              <input
                className="form-control"
                type="text"
                id="place"
                list="places"
                name="origin"
                placeholder="Kota Asal Pengiriman"
                onChange={handleChangeForm}
                requred
              />
              <datalist id="places">
                {cityData ? (
                  cityData.map((item) => (
                    <option
                      value={item.city_name}
                      label={item.province}
                      name={item.city_id}
                      key={item.city_id}
                    ></option>
                  ))
                ) : (
                  <></>
                )}
              </datalist>
            </div>
            <div className={`mb-3`}>
              <label for="exampleInputFirstName1" className={`form-label`}>
                Kota Tujuan :
              </label>
              <br />
              <input
                className="form-control"
                type="text"
                id="place"
                list="places"
                name="destination"
                placeholder="Kota Asal Pengiriman"
                onChange={handleChangeForm}
                required
              />
              <datalist id="places"></datalist>
            </div>
            <div className="mb-3">
              <label for="berat"> Berat :</label>
            </div>
            <div className="input-group mb-3">
              <input
                type="tel"
                name="weight"
                className="form-control"
                placeholder="Berat Paket"
                onChange={handleChangeForm}
                required
              />
              <span className="input-group-text" id="basic-addon2">
                gram
              </span>
            </div>
            <div className="mb-3">
              <div className="mb-3">
                <label for="">Jasa Pengiriman :</label>
              </div>
              <input
                type="radio"
                id="jne"
                name="courier"
                value="jne"
                onChange={handleChangeForm}
              />
              <label for="jne">
                <img src="image/New_Logo_JNE.png" alt="" />
              </label>
              <input
                type="radio"
                id="tiki"
                name="courier"
                value="tiki"
                onChange={handleChangeForm}
              />
              <label for="tiki">
                <img src="image/LogoTiKi.png" alt="" />
              </label>
              <input
                type="radio"
                id="pos"
                name="courier"
                value="pos"
                onChange={handleChangeForm}
              />
              <label for="pos">
                <img src="image/pos.jpg" alt="" />
              </label>
            </div>
            <button type="submit">Periksa</button>
          </form>
        </div>
        <div className={styles.landing__section__right}>
          <p>
            Harga Ongkir {form.origin || "..."} menuju{" "}
            {form.destination || "..."} dengan berat {form.weight || "..."} gram
            kurir {form.courier || "..."} :
          </p>
          <div>
            {costData ? (
              costData.map((item) => (
                <div
                  key={item.service}
                  className={styles.landing__section__cost}
                >
                  <h4>
                    <em>{item.service}</em> {`(${item.description})`}
                  </h4>
                  <h5>estimasi pengiriman {item.cost[0].etd} hari</h5>
                  <h4 className={styles.landing__section__cost__price}>
                    {numberFormat(item.cost[0].value)}
                  </h4>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <img
          src="image/delivery.png"
          alt=""
          className={styles.landing__section__image}
        />
      </section>
      <footer className={styles.landing__footer} id="contact">
        <p>
          Made with{"   "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-envelope-heart"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l3.235 1.94a2.76 2.76 0 0 0-.233 1.027L1 5.384v5.721l3.453-2.124c.146.277.329.556.55.835l-3.97 2.443A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741l-3.968-2.442c.22-.28.403-.56.55-.836L15 11.105V5.383l-3.002 1.801a2.76 2.76 0 0 0-.233-1.026L15 4.217V4a1 1 0 0 0-1-1H2Zm6 2.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
            />
          </svg>
        </p>
        <p>Using RajaOngkir API</p>
        <p>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>{" "}
          <a href="https://github.com/ArinIffana">ArinIffana</a>{" "} */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-instagram"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
          </svg>{" "}
          <a href="https://www.instagram.com/ariniffana/">ArinIffana</a>
        </p>
      </footer>
    </div>
  );
}
