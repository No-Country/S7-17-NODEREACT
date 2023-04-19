import Layout from "@/components/layout";
import styles from "../shop/styles.module.css";
import hammerIcon from "../../assets/hammer-icon.svg";
import wandIcon from "../../assets/magic-wand-icon.svg";
import coinIcon from "../../assets/coin-icon.svg";
import plusIcon from "../../assets/plus-icon.svg";
import Image from "next/image";

const Shop = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}></div>
        <div className={styles.data__container}>
          <div className={styles.data__title}>
            <p>Tienda</p>
          </div>
        </div>
        <div className={styles.bottom__container}>
          <div className={styles.shop__container}>
            <div className={styles.shop__left}>
              <p className={styles.shop__title}>Tus Ventajas</p>
              <div className={styles.left__icons}>
                <div className={styles.hammer__container}>
                  <div className={styles.hammer__icon}>
                    <Image
                      style={{ borderRadius: "50%" }}
                      width={30}
                      height={30}
                      src={hammerIcon}
                      alt=""
                    />
                    <div className={styles.hammer__number}>1</div>
                  </div>
                  <p>Martillos</p>
                </div>
                <div className={styles.wand__container}>
                  <div className={styles.hammer__icon}>
                    <Image
                      style={{ borderRadius: "50%" }}
                      width={30}
                      height={30}
                      src={wandIcon}
                      alt=""
                    />
                    <div className={styles.hammer__number}>1</div>
                  </div>
                  <p>Varas Mágicas</p>
                </div>
              </div>
            </div>
            <div className={styles.shop__center}>
              <p className={styles.shop__title}>Tus Monedas</p>
              <div className={styles.coin__img__container}>
                <div className={styles.coin__img}>
                  <Image width={35} height={35} src={coinIcon} alt="" />
                  <div className={styles.coin__number}>100</div>
                </div>
              </div>
            </div>
            <div className={styles.shop__right}>
              <p className={styles.shop__title}>Comprar</p>
              <div className={styles.buy__container}>
                <div className={styles.right__left}>
                  <div className={styles.left__container}>
                    <div className={styles.hammer__icon}>
                      <Image
                        style={{ borderRadius: "50%" }}
                        width={30}
                        height={30}
                        src={hammerIcon}
                        alt=""
                      />
                    </div>
                    <div className={styles.coin__img__container}>
                      <div className={styles.coin__img}>
                        <Image width={30} height={30} src={coinIcon} alt="" />
                        <div className={styles.coin__number}>1</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.left__container}>
                    <div className={styles.hammer__icon}>
                      <Image
                        style={{ borderRadius: "50%" }}
                        width={30}
                        height={30}
                        src={wandIcon}
                        alt=""
                      />
                    </div>
                    <div className={styles.coin__img__container}>
                      <div className={styles.coin__img}>
                        <Image width={30} height={30} src={coinIcon} alt="" />
                        <div className={styles.coin__number}>1</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.right__right}>
                  <div className={styles.plus__icon}>
                    <Image width={35} height={35} src={plusIcon} alt="" />
                    <p className={styles.plus__number}>1</p>
                  </div>
                  <div className={styles.plus__icon}>
                    <Image width={35} height={35} src={plusIcon} alt="" />
                    <p className={styles.plus__number}>1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
