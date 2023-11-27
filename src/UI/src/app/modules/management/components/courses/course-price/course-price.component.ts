import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

enum PriceTier {
  Free = 'Free',
  Tier1 = '19.99 (tier 1)',
  Tier2 = '29.99 (tier 2)',
}

interface PriceOption {
  tier: PriceTier;
  amount: number;
}

@Component({
  selector: 'app-course-price',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-price.component.html',
})
export class CoursePriceComponent implements OnInit {
  @Input() coursePrice: number;
  @Output() coursePriceChange = new EventEmitter<number>();

  priceTiers: PriceOption[] = [
    { tier: PriceTier.Free, amount: 0 },
    { tier: PriceTier.Tier1, amount: 19.99 },
    { tier: PriceTier.Tier2, amount: 29.99 },
  ];

  selectedOption: PriceTier;

  ngOnInit(): void {
    this.selectedOption = this.getPriceTier(this.coursePrice);
  }

  updatePrice(): void {
    const selectedPriceOption = this.priceTiers.find(
      (option) => option.tier === this.selectedOption
    );
    this.coursePriceChange.emit(selectedPriceOption?.amount || 0);
  }

  private getPriceTier(price: number): PriceTier {
    const matchingOption = this.priceTiers.find(
      (option) => option.amount === price
    );
    return matchingOption ? matchingOption.tier : PriceTier.Free;
  }
}
