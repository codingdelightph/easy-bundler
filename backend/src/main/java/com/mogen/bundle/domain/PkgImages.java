package com.mogen.bundle.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A PkgImages.
 */
@Entity
@Table(name = "pkg_images")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "pkgimages")
public class PkgImages implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "package_id")
    private Integer packageID;

    @Size(max = 500)
    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @ManyToOne
    @JsonIgnoreProperties(value = "pkgImgs", allowSetters = true)
    private ItemPackage pkg;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPackageID() {
        return packageID;
    }

    public PkgImages packageID(Integer packageID) {
        this.packageID = packageID;
        return this;
    }

    public void setPackageID(Integer packageID) {
        this.packageID = packageID;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public PkgImages imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ItemPackage getPkg() {
        return pkg;
    }

    public PkgImages pkg(ItemPackage itemPackage) {
        this.pkg = itemPackage;
        return this;
    }

    public void setPkg(ItemPackage itemPackage) {
        this.pkg = itemPackage;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PkgImages)) {
            return false;
        }
        return id != null && id.equals(((PkgImages) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PkgImages{" +
            "id=" + getId() +
            ", packageID=" + getPackageID() +
            ", imageUrl='" + getImageUrl() + "'" +
            "}";
    }
}
