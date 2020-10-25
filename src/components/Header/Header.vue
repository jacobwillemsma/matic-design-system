<template>
  <div class="m-header">
    <div class="header-left">
      <MaticLogo variant="horizontal" size="header" />
      <div class="app-name">{{ appName }}</div>
    </div>
    <div class="header-right">
      <div class="m-dropdown">
        <Button
          class="app-button"
          iconName="navbar/menu"
          inline
          label="Apps"
          nature="link"
          size="medium"
          variant="pill"
        />
      </div>
      <div class="m-dropdown">
        <Button
          backgroundColor="#F3F4F7"
          class="transaction-status"
          :class="transactionStatusClasses"
          inline
          :label="transactionText"
          size="medium"
          variant="pill"
        >
          <div class="icon-count" :class="countIconClasses">
            {{ transactionCount }}
          </div>
        </Button>
        <div class="dropdown-menu">
          <div class="dropdown-header">Transaction History</div>
          <div class="dropdown-body">
            <div
              class="transaction-item"
              :key="transaction.txHash"
              v-for="transaction in transactions"
              @click="handleTransactionClick(transaction)"
            >
              <div class="transaction-item-left">
                <Icon class="transaction-token-icon" :name="transaction.icon" />
                <Icon
                  class="transaction-status-icon"
                  :name="transactionTypeIcon(transaction.type)"
                />
              </div>
              <div class="transaction-item-right">
                <div class="transaction-title">
                  <span class="transaction-type">{{ transaction.type }}</span>
                  of
                  <span class="transaction-amount"
                    >{{ transaction.amount }}
                    {{ transaction.token.symbol }}</span
                  >
                  to
                  {{ transactionTo(transaction.type) }}
                </div>
                <div class="transaction-subtitle">
                  <Icon
                    :class="transactionStatusIconClasses(transaction.status)"
                    name="custom/pending"
                  />
                  {{
                    transactionStatusText(transaction.type, transaction.status)
                  }}
                  &#183;
                  {{
                    transactionSecondsAgoString(transaction.updatedAt.seconds)
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        class="metamask-address"
        :class="metamaskAddressClasses"
        :label="shortMetamaskAddress"
        iconName="login/metamask"
        iconNameRight="discloser/bottom"
        size="medium"
        variant="pill"
        backgroundColor="#F3F4F7"
        inline
      />
      <Button
        class="login-button"
        :class="loginButtonClasses"
        iconName="navbar/qr"
        inline
        label="Login"
        nature="primary"
        variant="pill"
      />
    </div>
  </div>
</template>

<script>
import "./header.scss";
import Button from "../Button/Button";
import MaticLogo from "../MaticLogo/MaticLogo";
import Icon from "../Icon/Icon";

import { truncateString, timeAgo } from "../../utils";

export default {
  name: "Header",

  components: {
    Button,
    MaticLogo,
    Icon,
  },

  props: {
    appName: {
      type: String,
    },
    metamaskAddress: {
      type: String,
    },
    transactionCount: {
      type: Number,
      default: 0,
    },
    transactionText: {
      type: String,
    },
    transactionStatus: {
      type: String,
      default: "progress",
      validator: function (value) {
        return ["action", "progress"].indexOf(value) !== -1;
      },
    },
    transactions: {
      type: Array,
    },
    // onTransactionClick: {
    //   type: Function,
    // },
  },

  computed: {
    countIconClasses() {
      return {
        [`status--${this.transactionStatus}`]: true,
      };
    },
    loginButtonClasses() {
      return {
        "display-none": this.metamaskAddress,
      };
    },
    metamaskAddressClasses() {
      return {
        "display-none": !this.metamaskAddress,
      };
    },
    shortMetamaskAddress() {
      return truncateString(this.metamaskAddress, 20, 5, 5);
    },
    transactionStatusClasses() {
      return {
        "display-none": !this.transactionCount || this.transactionCount < 0,
      };
    },
    transactionStatusIconClasses() {
      return (status) => (status == 3 ? "" : "display-none");
    },
    transactionTypeIcon() {
      return (name) =>
        name == "withdraw" ? `transaction/out` : `transaction/in`;
    },
    transactionTo() {
      return (transactionType) =>
        transactionType == "withdraw" ? "Ethereum" : "Matic";
    },
    transactionStatusText() {
      return (transactionType, transactionStatusCode) => {
        if (transactionType == "withdraw") {
          switch (transactionStatusCode) {
            case -1:
              return "Burn transaction pending";
            case -2:
              return "Checkpointed";
            case -3:
              return "Exit transaction pending";
            case -4:
              return "Exit transaction failed";
            case -5:
              return "Exit transaction completed";
            case -6:
              return "Burn transaction failed";
            case -7:
              return "In checkpoint";
          }
        } else if (transactionType == "deposit") {
          switch (transactionStatusCode) {
            case 3:
              return "Deposit pending";
            case 2:
              return "Deposit failed";
            case 1:
              return "Deposit confirmed (enroute)";
            case 0:
              return "Depoisit completed";
          }
        }
      };
    },
    transactionSecondsAgoString() {
      return (timestamp) => timeAgo(timestamp);
    },
  },

  methods: {
    onClick() {
      this.$emit("onClick");
    },
    handleTransactionClick(tx) {
      this.$emit("onTransactionClick", tx);
    },
  },
};
</script>