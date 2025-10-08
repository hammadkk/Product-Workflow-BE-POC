import axios from 'axios';
import { Product } from 'src/graphql';
import { ProductStatus } from './enum';
const NOTIFICATION_URL =
  'http://0.0.0.0:4100/workflow-engine/api/workflow/approval';

const WORKFLOW_WEBHOOK =
  'http://localhost:4100/workflow-engine/api/webhook/835ef87b-edfd-48f0-a4e3-a639d25f9e5a';

export async function triggerWorkflowForProduct(
  product: Product,
  isProductKnown: boolean,
) {
  const isRejected = product.status === ProductStatus.REJECTED;

  const isProductRejected = isRejected;

  const payload = {
    product: {
      name: product.name,
      MFR: product.mfr,
      description: product.description,
      price: product.price,
      SKU: product.sku,
    },
    isProductKnown,
    isProductRejected,
  };

  try {
    const response = await axios.post(WORKFLOW_WEBHOOK, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Webhook triggered successfully:', response.data);
  } catch (error) {
    console.error('Failed to trigger webhook:', error.message);
  }
}

export async function sendWorkflowApproval(
  workflowId: string,
  nodeId: string,
  userId: string,
  approval: boolean,
): Promise<any> {
  try {
    const response = await axios.post(
      NOTIFICATION_URL,
      {
        workflowId,
        nodeId,
        userId,
        approval,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      'Error sending workflow approval:',
      error?.response?.data || error.message,
    );
    throw new Error(
      error?.response?.data?.message ||
        'Failed to send workflow approval request.',
    );
  }
}
