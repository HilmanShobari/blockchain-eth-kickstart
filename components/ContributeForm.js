import React from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";

class ContributeForm extends React.Component {
  state = {
    value: "",
    errorMessage: "",
    successMessage: false,
    loading: false, 
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "", successMessage: false});

    try {
      const campaign = Campaign(this.props.address);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: this.state.value,
      });

      this.setState({ successMessage: true });
      Router.pushRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            label="wei"
            labelPosition="right"
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        {this.state.successMessage && (
          <Message positive header="Success!" content="Contribution Success!" />
        )}
        <Button loading={this.state.loading} primary>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
