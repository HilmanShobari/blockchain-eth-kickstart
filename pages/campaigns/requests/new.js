import React from "react";
import Layout from "../../../components/Layout";
import { Button, Form, Message, Input } from "semantic-ui-react";
import { Link, Router } from "../../../routes";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";

class RequestNew extends React.Component {
  state = {
    description: "",
    value: "",
    recipient: "",
    errorMessage: "",
    successMessage: false,
    loading: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "", successMessage: false });

    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });

      this.setState({ successMessage: true });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>
            Back
          </a>
        </Link>
        <h3>Create New Request</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>

          <Button loading={this.state.loading} primary>Create</Button>

          <Message error header="Oops!" content={this.state.errorMessage} />
          {this.state.successMessage && (
            <Message
              positive
              header="Success!"
              content="Contribution Success!"
            />
          )}
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
