import React from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends React.Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContibution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      appoversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      minimumContibution,
      balance,
      requestsCount,
      appoversCount,
      manager,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description: "The created this campaign and can create request",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContibution,
        meta: "Minimum Contribution of This Campaign",
        description: "The Minimum Contribution of Wei To Become Approver",
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "This Campaign Balance",
        description: "This Campaign Balance of Ether",
        style: { overflowWrap: "break-word" },
      },
      {
        header: requestsCount,
        meta: "Total Request Active",
        description: "This is The Total Request Active Right Now",
        style: { overflowWrap: "break-word" },
      },
      {
        header: appoversCount,
        meta: "Total Approvers",
        description: "This is The Total Approvers from of Campaign",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
